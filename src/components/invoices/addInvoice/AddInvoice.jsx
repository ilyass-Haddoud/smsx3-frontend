import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Stack } from "@mui/material";

const MyButtonWithModal = () => {
  const [openModal, setOpenModal] = useState(false);
  const [editedValues, setEditedValues] = useState({
    numero_facture: "",
    site_vente: "",
    type: "",
    reference: "",
    date: "",
    client_facture: "",
    client_intitule: "",
    client_commande: "",
    tiers_payeur: "",
    client_groupe: "",
    etat: "",
    devise: "",
    debut_echeance: "",
    type_paiement: "",
    date_debut_periode: "",
    date_fin_periode: "",
    document: null,
  });

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedValues({ ...editedValues, [name]: value });
  };

  const handleFileInputChange = (e) => {
    const { name, files } = e.target;
    setEditedValues({ ...editedValues, [name]: files[0] });
  };

  const handleSaveClick = () => {
    console.log("Valeurs sauvegardées :", editedValues);
    handleCloseModal();
  };

  const handleCancelClick = () => {
    setEditedValues({
      numero_facture: "",
      site_vente: "",
      type: "",
      reference: "",
      date: "",
      client_facture: "",
      client_intitule: "",
      client_commande: "",
      tiers_payeur: "",
      client_groupe: "",
      etat: "",
      devise: "",
      debut_echeance: "",
      type_paiement: "",
      date_debut_periode: "",
      date_fin_periode: "",
      document: null,
    });
    handleCloseModal();
  };

  return (
    <div>
      <Button variant="contained" color="success" onClick={handleOpenModal}>
        Ajouter une facture
      </Button>
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
          <Typography sx={{ marginBottom: "2rem" }} variant="h6" gutterBottom>
            Ajouter une facture
          </Typography>
          <Grid container spacing={2}>
            {Object.keys(editedValues).map((key) => (
              <Grid key={key} item xs={6} sm={3}>
                {key === "date" ||
                key === "date_debut_periode" ||
                key === "date_fin_periode" ? (
                  <TextField
                    label={key.replace(/_/g, " ")}
                    type="date"
                    name={key}
                    value={editedValues[key]}
                    fullWidth
                    onChange={handleInputChange}
                    sx={{ mb: 2 }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                ) : key === "document" ? (
                  <input
                    accept="application/pdf"
                    type="file"
                    name={key}
                    onChange={handleFileInputChange}
                    style={{ marginBottom: "1.25em" }}
                  />
                ) : (
                  <TextField
                    label={key.replace(/_/g, " ")}
                    name={key}
                    value={editedValues[key]}
                    fullWidth
                    onChange={handleInputChange}
                    sx={{ mb: 2 }}
                  />
                )}
              </Grid>
            ))}
          </Grid>
          <Stack direction="row" spacing={1}>
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
  );
};

export default MyButtonWithModal;
