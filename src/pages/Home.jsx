import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Modal, Typography, Box, Button } from "@mui/material";
import data from "../data/invoices/data";

const Home = () => {
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [openModal, setOpenModal] = useState(false);

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
      <DataGrid
        rows={data}
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
        ]}
        rowsPerPageOptions={[5, 10, 20]}
        onRowClick={handleRowClick}
      />
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
