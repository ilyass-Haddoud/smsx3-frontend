import React, { useState } from "react";
import {
  GridRowModes,
  DataGrid,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from "@mui/x-data-grid";
import { Modal, Typography, Box, Button, Stack } from "@mui/material";
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

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id) => () => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleRowClick = (params) => {
    setSelectedInvoice(params.row);
    setOpenModal(true);
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
      <Stack direction="column" spacing={2} height={"100%"} width={"100%"}>
        <Button variant="contained">Ajouter une facture</Button>
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
              getActions: ({ id }) => {
                const isInEditMode =
                  rowModesModel[id]?.mode === GridRowModes.Edit;

                if (isInEditMode) {
                  return [
                    <GridActionsCellItem
                      icon={<SaveIcon />}
                      label="Save"
                      sx={{
                        color: "primary.main",
                      }}
                      onClick={handleSaveClick(id)}
                    />,
                    <GridActionsCellItem
                      icon={<CancelIcon />}
                      label="Cancel"
                      className="textPrimary"
                      onClick={handleCancelClick(id)}
                      color="inherit"
                    />,
                  ];
                }

                return [
                  <GridActionsCellItem
                    icon={<EditIcon />}
                    label="Edit"
                    className="textPrimary"
                    onClick={handleEditClick(id)}
                    color="inherit"
                  />,
                  <GridActionsCellItem
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
          onRowClick={handleRowClick}
        />
      </Stack>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box sx={{ width: 400, bgcolor: "background.paper", p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Détails de la Facture
          </Typography>
          {selectedInvoice && (
            <div>
              <Typography variant="body1">
                <strong>Numéro de Facture:</strong>
                {selectedInvoice.numero_facture}
              </Typography>
              <Typography variant="body1">
                <strong>Site de vente:</strong> {selectedInvoice.site_vente}
              </Typography>
              <Typography variant="body1">
                <strong>Type:</strong> {selectedInvoice.type}
              </Typography>
              <Typography variant="body1">
                <strong>Référence:</strong> {selectedInvoice.reference}
              </Typography>
              <Typography variant="body1">
                <strong>Date:</strong> {selectedInvoice.date}
              </Typography>
              <Typography variant="body1">
                <strong>Client:</strong> {selectedInvoice.client_facture}
              </Typography>
              <Typography variant="body1">
                <strong>Intitulé du client:</strong>
                {selectedInvoice.client_intitule}
              </Typography>
              <Typography variant="body1">
                <strong>Commande du client:</strong>
                {selectedInvoice.client_commande}
              </Typography>
              <Typography variant="body1">
                <strong>Tiers payeur:</strong> {selectedInvoice.tiers_payeur}
              </Typography>
              <Typography variant="body1">
                <strong>Groupe client:</strong> {selectedInvoice.client_groupe}
              </Typography>
              <Typography variant="body1">
                <strong>État:</strong> {selectedInvoice.etat}
              </Typography>
              <Typography variant="body1">
                <strong>Devise:</strong> {selectedInvoice.devise}
              </Typography>
              <Typography variant="body1">
                <strong>Début échéance:</strong>
                {selectedInvoice.debut_echeance}
              </Typography>
              <Typography variant="body1">
                <strong>Type de paiement:</strong>
                {selectedInvoice.type_paiement}
              </Typography>
              <Typography variant="body1">
                <strong>Date de début de période:</strong>
                {selectedInvoice.date_debut_periode}
              </Typography>
              <Typography variant="body1">
                <strong>Date de fin de période:</strong>
                {selectedInvoice.date_fin_periode}
              </Typography>
              <Typography variant="body1">
                <strong>Document:</strong> {selectedInvoice.document}
              </Typography>
            </div>
          )}
          <Button onClick={handleCloseModal}>Fermer</Button>
        </Box>
      </Modal>
    </div>
  );
};

export default Home;
