import React, { useState, useCallback } from "react";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { Modal, Typography, Box, Button, TextField, Stack } from "@mui/material";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import Grid from "@mui/material/Grid";

const ClaimsTable = React.memo(() => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedReclamation, setSelectedReclamation] = useState(null);
  const [reclamations, setReclamations] = useState([
    {
      id: 1,
      date: "2024-04-15",
      entete: "Problème de livraison",
      message: "Le colis n'a pas été livré à temps.",
      etat: "En attente",
    },
    {
      id: 2,
      date: "2024-04-14",
      entete: "Produit endommagé",
      message: "Le produit est arrivé cassé.",
      etat: "En cours de traitement",
    },
    {
      id: 3,
      date: "2024-04-13",
      entete: "Remboursement demandé",
      message: "Je demande un remboursement pour un produit défectueux.",
      etat: "Résolu",
    },
  ]);

  const handleDeleteClick = useCallback(
    (id) => () => {
      setReclamations(reclamations.filter((reclamation) => reclamation.id !== id));
    },
    [reclamations]
  );

  const handleRowClick = useCallback(
    (params) => {
      setSelectedReclamation(params.row);
      setOpenModal(true);
    },
    []
  );

  const handleCancelClick = useCallback(() => {
    setOpenModal(false);
  }, []);

  return (
    <div style={{ height: "60vh", width: "100%", display: "flex", flexDirection: "column", gap: "2rem" }}>
      <DataGrid
        sx={{ maxHeight: "100%", width: "100%" }}
        rows={reclamations}
        columns={[
          { field: "date", headerName: "Date", flex: 1 },
          { field: "entete", headerName: "Entête", flex: 1 },
          { field: "message", headerName: "Message", flex: 1 },
          { field: "etat", headerName: "État", flex: 1 },
          {
            field: "actions",
            type: "actions",
            headerName: "Actions",
            cellClassName: "actions",
            getActions: ({ id }) => [
              <GridActionsCellItem
                key="delete"
                icon={<DeleteIcon />}
                label="Delete"
                onClick={handleDeleteClick(id)}
                color="inherit"
              />,
            ],
          },
        ]}
        onRowClick={handleRowClick}
      />
      <Modal
        open={openModal}
        onClose={handleCancelClick}
        style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Box sx={{ width: "90%", maxWidth: 800, bgcolor: "background.paper", p: 2 }}>
          <Typography sx={{ marginBottom: "2rem" }} variant="h6" gutterBottom>
            Détails de la Réclamation
          </Typography>
          {selectedReclamation && (
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Date"
                  value={selectedReclamation.date}
                  fullWidth
                  disabled
                  sx={{ mb: 2 }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Entête"
                  value={selectedReclamation.entete}
                  fullWidth
                  disabled
                  sx={{ mb: 2 }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Message"
                  value={selectedReclamation.message}
                  fullWidth
                  disabled
                  sx={{ mb: 2 }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="État"
                  value={selectedReclamation.etat}
                  fullWidth
                  disabled
                  sx={{ mb: 2 }}
                />
              </Grid>
            </Grid>
          )}
          <Button variant="outlined" color="info" onClick={handleCancelClick}>
            Fermer
          </Button>
        </Box>
      </Modal>
    </div>
  );
});

export default ClaimsTable;
