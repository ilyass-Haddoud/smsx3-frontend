import React, { useState, useCallback, useEffect } from "react";
import {
  GridRowModes,
  DataGrid,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from "@mui/x-data-grid";
import {
  Modal,
  Typography,
  Box,
  Button,
  TextField,
  Stack,
  CircularProgress,
  Select,
  InputLabel,
  MenuItem,
  FormControl
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import Grid from "@mui/material/Grid";
import getSuppliersRequest,{ disableSupplier } from "../../features/suppliers/supplierApi";
import { useDispatch, useSelector } from "react-redux";
import useJwt from "../../hooks/useJwt"

const SuppliersTable = () => {
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const data = useSelector(state => state.supplierReducer);
  const [rows, setRows] = useState([]);
  const [rowModesModel, setRowModesModel] = useState({});
  const [editedSupplier, setEditedSupplier] = useState(null);
  const [editedValues, setEditedValues] = useState({});
  const {token, decodedToken} = useJwt();


  useEffect(() => {
    dispatch(getSuppliersRequest({token, decodedToken}));
  }, [dispatch]);

  useEffect(() => {
    if (data.suppliers) {
      setRows(data.suppliers);
    }
  }, [data.suppliers]);

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (supplier) => () => {
      setEditedSupplier(supplier.row);
      setEditedValues(supplier.row);
      setOpenModal(true);
  }

  const handleSaveClick = () => {
    const updatedRows = rows.map((row) =>
      row.bpsnum === editedSupplier.bpsnum ? { ...editedValues } : row
    );
    dispatch(disableSupplier({requestData:updatedRows,token,decodedToken}));
    setOpenModal(false);
  };

  const handleDeleteClick = (bpsnum) => () => {
      setRows((prevRows) => prevRows.filter((row) => row.bpsnum !== bpsnum));
  };

  const handleCancelClick = () => {
    setOpenModal(false);
    setEditedSupplier(null);
    setEditedValues({});
  };


  const processRowUpdate = (newRow) => {
      const updatedRow = { ...newRow, isNew: false };
      setRows(rows.map((row) => (row.bpsnum === newRow.bpsnum ? updatedRow : row)));
      return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const getRowId = (row) => {
    return row.bpsnum;
  };

  return (
    <>
      {data.isLoading &&
        <Box sx={{ display: 'flex' }}>
          <CircularProgress color="success" />
        </Box>
      }
      {
        !data.isLoading &&
        <div
          style={{
            height: "60vh",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "2rem",
          }}
        >
          <DataGrid
            sx={{ maxHeight: "100%", width: "100%", color: "white", '.MuiDataGrid-topContainer': { color: "black" } }}
            rows={rows}
            getRowId={getRowId}
            columns={[
              {
                field: "bpsnum",
                headerName: "Numéro fournisseur",
                flex: 1,
              },
              {
                field: "bpsnam",
                headerName: "Raison social",
                flex: 1,
              },
              { field: "bpstyp", headerName: "Type fournisseur", flex: 1 },
              { field: "disactivated", headerName: "État", flex: 1, valueGetter : (params) => params ? "Désactivé" : "Activé"},
              {
                field: "actions",
                type: "actions",
                headerName: "Actions",
                cellClassName: "actions",
                getActions: ({ id, ...invoice }) => {
                  const isInEditMode =
                    rowModesModel[id]?.mode === GridRowModes.Edit;

                  if (isInEditMode) {
                    return [
                      <GridActionsCellItem
                        key="save"
                        icon={<SaveIcon />}
                        label="Save"
                        sx={{
                          color: "black",
                        }}
                        onClick={handleSaveClick}
                      />,
                      <GridActionsCellItem
                        key="cancel"
                        icon={<CancelIcon />}
                        label="Cancel"
                        className="textPrimary"
                        onClick={handleCancelClick}
                        color="black"
                      />,
                    ];
                  }

                  return [
                    <GridActionsCellItem
                      key="edit"
                      icon={<EditIcon />}
                      label="Edit"
                      className="textPrimary"
                      onClick={handleEditClick(invoice)}
                      color="inherit"
                    />,
                    <GridActionsCellItem
                      key="delete"
                      icon={<DeleteIcon />}
                      label="Delete"
                      onClick={handleDeleteClick(id)}
                      color="inherit"
                    />,
                  ];
                },
              },
            ]}
            editMode="row"
            rowModesModel={rowModesModel}
            onRowModesModelChange={handleRowModesModelChange}
            onRowEditStop={handleRowEditStop}
            processRowUpdate={processRowUpdate}
            rowsPerPageOptions={[10, 20, 30]}
          />
          <Modal
            open={openModal}
            onClose={handleCancelClick}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                width: "90%",
                maxWidth: 800,
                bgcolor: "background.paper",
                p: 2,
              }}
            >
              <Typography sx={{ marginBottom: "2rem",color:"black" }} variant="h6" gutterBottom>
                Modifier le fournisseur
              </Typography>
              {editedSupplier && (
                <Grid container spacing={2}>
                  <Grid item xs={6} sm={3}>
                    <TextField
                      label="Identifiant"
                      name="bpsnum"
                      disabled="true"
                      value={editedValues.bpsnum || ''}
                      fullWidth
                      onChange={handleInputChange}
                      sx={{ mb: 2 }}
                    />
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <TextField
                      label="Raison sociale"
                      name="bpsnam"
                      disabled="true"
                      value={editedValues.bpsnam || ''}
                      fullWidth
                      onChange={handleInputChange}
                      sx={{ mb: 2 }}
                    />
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <TextField
                      label="Adresse de facturation"
                      name="bpainv"
                      disabled="true"
                      value={editedValues.bpainv || ''}
                      fullWidth
                      onChange={handleInputChange}
                      sx={{ mb: 2 }}
                    />
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <TextField
                      label="Adresse par défaut"
                      name="bpaadd"
                      disabled="true"
                      value={editedValues.bpaadd || ''}
                      fullWidth
                      onChange={handleInputChange}
                      sx={{ mb: 2 }}
                    />
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <TextField
                      label="Observations"
                      name="bpsrem"
                      disabled="true"
                      value={editedValues.bpsrem || ''}
                      fullWidth
                      onChange={handleInputChange}
                      sx={{ mb: 2 }}
                    />
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <TextField
                      label="Fournisseur groupe"
                      name="bpsgru"
                      disabled="true"
                      value={editedValues.bpsgru || ''}
                      fullWidth
                      onChange={handleInputChange}
                      sx={{ mb: 2 }}
                    />
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <TextField
                      label="Tiers risque"
                      name="bpsrsk"
                      disabled="true"
                      value={editedValues.bpsrsk || ''}
                      fullWidth
                      onChange={handleInputChange}
                      sx={{ mb: 2 }}
                    />
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <TextField
                      label="Catégorie"
                      name="bsgcod"
                      disabled="true"
                      value={editedValues.bsgcod || ''}
                      fullWidth
                      onChange={handleInputChange}
                      sx={{ mb: 2 }}
                    />
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <TextField
                      label="Transporteur"
                      name="bptnum"
                      disabled="true"
                      value={editedValues.bptnum || ''}
                      fullWidth
                      onChange={handleInputChange}
                      sx={{ mb: 2 }}
                    />
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <TextField
                      label="Numéro du client/fournisseur"
                      name="bpsnumbps"
                      disabled="true"
                      value={editedValues.bpsnumbps || ''}
                      fullWidth
                      onChange={handleInputChange}
                      sx={{ mb: 2 }}
                    />
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <TextField
                      label="Numéro de téléphone"
                      name="bpsnumtel"
                      disabled="true"
                      value={editedValues.bpsnumtel || ''}
                      fullWidth
                      onChange={handleInputChange}
                      sx={{ mb: 2 }}
                    />
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <TextField
                      label="Adresse e-mail"
                      name="bpsaddeml"
                      disabled="true"
                      value={editedValues.bpsaddeml || ''}
                      fullWidth
                      onChange={handleInputChange}
                      sx={{ mb: 2 }}
                    />
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <TextField
                      label="Type de fournisseur"
                      name="bpstyp"
                      disabled="true"
                      value={editedValues.bpstyp || ''}
                      fullWidth
                      onChange={handleInputChange}
                      sx={{ mb: 2 }}
                    />
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <TextField
                      label="Prénom"
                      name="bpsfname"
                      disabled="true"
                      value={editedValues.bpsfname || ''}
                      fullWidth
                      onChange={handleInputChange}
                      sx={{ mb: 2 }}
                    />
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <TextField
                      label="Nom"
                      name="bpslname"
                      disabled="true"
                      value={editedValues.bpslname || ''}
                      fullWidth
                      onChange={handleInputChange}
                      sx={{ mb: 2 }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth sx={{ mb: 2 }}>
                      <InputLabel>Status Compte</InputLabel>
                      <Select
                        label="Status Compte"
                        name="disactivated"
                        value={editedValues.disactivated}
                        onChange={handleInputChange}
                      >
                        <MenuItem value={false}>Activé</MenuItem>
                        <MenuItem value={true}>Désactivé</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              )}
              <Stack direction="row" spacing={2}>
                <Button variant="contained" color="info" onClick={handleSaveClick}>
                  Modifier
                </Button>
                <Button variant="outlined" color="info" onClick={handleCancelClick}>
                  Annuler
                </Button>
              </Stack>
            </Box>
          </Modal>
        </div>
      }
    </>
  );
};

export default SuppliersTable;
