import React, { useState } from "react";
import { Modal, Typography, Box, Button, TextField } from "@mui/material";

const AddClaim = () => {
  const [openModal, setOpenModal] = useState(false);
  const [reclamationData, setReclamationData] = useState({
    entete: "",
    message: "",
  });

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReclamationData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Données de la réclamation :", reclamationData);
    setReclamationData({ entete: "", message: "" });
    setOpenModal(false);
  };

  return (
    <div>
      <Button variant="contained" color="success" onClick={handleOpenModal}>
        Ajouter une Réclamation
      </Button>
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            maxWidth: 400,
            minWidth: 300,
            borderRadius: 4,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Formulaire de Réclamation
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Entête"
              name="entete"
              value={reclamationData.entete}
              onChange={handleChange}
              fullWidth
              margin="normal"
              variant="outlined"
            />
            <TextField
              label="Message"
              name="message"
              value={reclamationData.message}
              onChange={handleChange}
              fullWidth
              multiline
              rows={4}
              margin="normal"
              variant="outlined"
            />
            <Button type="submit" variant="contained" color="primary">
              Soumettre
            </Button>
            <Button onClick={handleCloseModal} variant="outlined" color="inherit" sx={{ ml: 2 }}>
              Annuler
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default AddClaim;
