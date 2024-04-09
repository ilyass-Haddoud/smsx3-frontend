import React, { useState, useCallback } from "react";
import {
  GridRowModes,
  DataGrid,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from "@mui/x-data-grid";
import { Modal, Typography, Box, Button, TextField } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import data from "../data/invoices/data";
import Grid from "@mui/material/Grid";

const Home = React.memo(() => {
  const [openModal, setOpenModal] = useState(false);
  const [rows, setRows] = useState(data);
  const [rowModesModel, setRowModesModel] = useState({});
  const [editedInvoice, setEditedInvoice] = useState(null);
  const [editedValues, setEditedValues] = useState({});

  const handleRowEditStop = useCallback((params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  }, []);

  const handleEditClick = useCallback(
    (invoice) => () => {
      setEditedInvoice(invoice);
      setEditedValues(invoice.row);
      setOpenModal(true);
    },
    []
  );

  const handleSaveClick = useCallback(() => {
    const updatedRows = rows.map((row) =>
      row.id === editedInvoice.row.id ? editedValues : row
    );
    setRows(updatedRows);
    setOpenModal(false);
  }, [rows, editedInvoice, editedValues]);

  const handleDeleteClick = useCallback(
    (id) => () => {
      setRows(rows.filter((row) => row.id !== id));
    },
    [rows]
  );

  const handleCancelClick = useCallback(() => {
    setOpenModal(false);
  }, []);

  const processRowUpdate = useCallback(
    (newRow) => {
      const updatedRow = { ...newRow, isNew: false };
      setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
      return updatedRow;
    },
    [rows]
  );

  const handleRowModesModelChange = useCallback((newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  }, []);

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setEditedValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }, []);

  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
      }}
    >
      <h1>Liste des Factures: </h1>
      <DataGrid
        sx={{ height: "40%", width: "100%" }}
        rows={rows}
        columns={[
          {
            field: "numero_facture",
            headerName: "Numéro de Facture",
            flex: 1,
          },
          {
            field: "client_facture",
            headerName: "Client",
            flex: 1,
          },
          { field: "etat", headerName: "État", flex: 1 },
          { field: "date", headerName: "Date", flex: 1 },
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
                      color: "primary.main",
                    }}
                    onClick={handleSaveClick}
                  />,
                  <GridActionsCellItem
                    key="cancel"
                    icon={<CancelIcon />}
                    label="Cancel"
                    className="textPrimary"
                    onClick={handleCancelClick}
                    color="inherit"
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
            width: "80%",
            maxWidth: 600,
            bgcolor: "background.paper",
            p: 2,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Modifier la Facture
          </Typography>
          {editedInvoice && (
            <div>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    label="Numéro de Facture"
                    name="numero_facture"
                    value={editedValues.numero_facture}
                    fullWidth
                    onChange={handleInputChange}
                    sx={{ mb: 2 }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Site de vente"
                    name="site_vente"
                    value={editedValues.site_vente}
                    fullWidth
                    onChange={handleInputChange}
                    sx={{ mb: 2 }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Type"
                    name="type"
                    value={editedValues.type}
                    fullWidth
                    onChange={handleInputChange}
                    sx={{ mb: 2 }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Référence"
                    name="reference"
                    value={editedValues.reference}
                    fullWidth
                    onChange={handleInputChange}
                    sx={{ mb: 2 }}
                  />
                </Grid>
              </Grid>
              <TextField
                label="Date"
                name="date"
                value={editedValues.date}
                fullWidth
                onChange={handleInputChange}
                sx={{ mb: 2 }}
              />
              <TextField
                label="Client"
                name="client_facture"
                value={editedValues.client_facture}
                fullWidth
                onChange={handleInputChange}
                sx={{ mb: 2 }}
              />
              <TextField
                label="Intitulé du client"
                name="client_intitule"
                value={editedValues.client_intitule}
                fullWidth
                onChange={handleInputChange}
                sx={{ mb: 2 }}
              />
            </div>
          )}
          <Button onClick={handleSaveClick}>Modifier</Button>
          <Button onClick={handleCancelClick}>Annuler</Button>
        </Box>
      </Modal>
    </div>
  );
});

export default Home;
