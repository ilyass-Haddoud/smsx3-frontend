import React, { useState } from "react";
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
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import data from "../data/invoices/data";

const Home = () => {
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [rows, setRows] = useState(data);
  const [rowModesModel, setRowModesModel] = useState({});
  const [editedInvoice, setEditedInvoice] = useState(null);
  const [editedValues, setEditedValues] = useState({});

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (invoice) => () => {
    setEditedInvoice(invoice);
    setEditedValues(invoice.row);
    setOpenModal(true);
  };

  const handleSaveClick = () => {
    const updatedRows = rows.map((row) =>
      row.id === editedInvoice.row.id ? editedValues : row
    );
    setRows(updatedRows);
    setOpenModal(false);
  };

  const handleDeleteClick = (id) => () => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const handleCancelClick = () => {
    setOpenModal(false);
  };

  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
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

  return (
    <div
      style={{
        height: 300,
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <DataGrid
        rows={rows}
        columns={[
          {
            field: "numero_facture",
            headerName: "Numéro de Facture",
            flex: 1,
            editable: true,
          },
          {
            field: "client_facture",
            headerName: "Client",
            flex: 1,
            editable: true,
          },
          { field: "etat", headerName: "État", flex: 1, editable: true },
          { field: "date", headerName: "Date", flex: 1, editable: true },
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
              <Stack direction={rows} spacing={10}>
                <TextField
                  label="Numéro de Facture"
                  name="numero_facture"
                  value={editedValues.numero_facture}
                  fullWidth
                  onChange={handleInputChange}
                  sx={{ mb: 2 }}
                />
                <TextField
                  label="Site de vente"
                  name="site_vente"
                  value={editedValues.site_vente}
                  fullWidth
                  onChange={handleInputChange}
                  sx={{ mb: 2 }}
                />
                <TextField
                  label="Type"
                  name="type"
                  value={editedValues.type}
                  fullWidth
                  onChange={handleInputChange}
                  sx={{ mb: 2 }}
                />
                <TextField
                  label="Référence"
                  name="reference"
                  value={editedValues.reference}
                  fullWidth
                  onChange={handleInputChange}
                  sx={{ mb: 2 }}
                />
              </Stack>
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
              <TextField
                label="Commande du client"
                name="client_commande"
                value={editedValues.client_commande}
                fullWidth
                onChange={handleInputChange}
                sx={{ mb: 2 }}
              />
              <TextField
                label="Tiers payeur"
                name="tiers_payeur"
                value={editedValues.tiers_payeur}
                fullWidth
                onChange={handleInputChange}
                sx={{ mb: 2 }}
              />
              <TextField
                label="Groupe client"
                name="client_groupe"
                value={editedValues.client_groupe}
                fullWidth
                onChange={handleInputChange}
                sx={{ mb: 2 }}
              />
              <TextField
                label="État"
                name="etat"
                value={editedValues.etat}
                fullWidth
                onChange={handleInputChange}
                sx={{ mb: 2 }}
              />
              <TextField
                label="Devise"
                name="devise"
                value={editedValues.devise}
                fullWidth
                onChange={handleInputChange}
                sx={{ mb: 2 }}
              />
              <TextField
                label="Début échéance"
                name="debut_echeance"
                value={editedValues.debut_echeance}
                fullWidth
                onChange={handleInputChange}
                sx={{ mb: 2 }}
              />
              <TextField
                label="Type de paiement"
                name="type_paiement"
                value={editedValues.type_paiement}
                fullWidth
                onChange={handleInputChange}
                sx={{ mb: 2 }}
              />
              <TextField
                label="Date de début de période"
                name="date_debut_periode"
                value={editedValues.date_debut_periode}
                fullWidth
                onChange={handleInputChange}
                sx={{ mb: 2 }}
              />
              <TextField
                label="Date de fin de période"
                name="date_fin_periode"
                value={editedValues.date_fin_periode}
                fullWidth
                onChange={handleInputChange}
                sx={{ mb: 2 }}
              />
              <TextField
                label="Document"
                name="document"
                value={editedValues.document}
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
};

export default Home;
