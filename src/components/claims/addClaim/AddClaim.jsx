import React, { useState } from "react";
import { Modal, Typography, Box, Button, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import addClaimSchema from "./addClaimValidation"
import { useDispatch } from "react-redux";
import addClaimRequest from "../../../features/claims/claimApi";
import useJwt from "../../../hooks/useJwt";

const AddClaim = () => {
  const [openModal, setOpenModal] = useState(false);
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors,isSubmitting },
  } = useForm({resolver:yupResolver(addClaimSchema)});
  const dispatch = useDispatch();
  const {token, decodedToken } = useJwt();
  const handleOpenModal = () => {
    setOpenModal(true);
  };
  const handleCloseModal = () => {
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
          <form
            onSubmit={handleSubmit((data) => {
              dispatch(addClaimRequest({requestData:data, token, decodedToken}));
              handleCloseModal();
              reset();
            })}
          >
            <Controller
              control={control}
              name="entete"
              render={({ field: { value, onChange } }) => {
                return (
                  <TextField
                  label="Entête"
                  name="entete"
                  value={value}
                  onChange={onChange}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                />
                );
              }}
            />
            <Controller
              control={control}
              name="message"
              render={({ field: { value, onChange } }) => {
                return (
                  <TextField
                    label="Message"
                    name="message"
                    value={value}
                    onChange={onChange}
                    fullWidth
                    multiline
                    rows={4}
                    margin="normal"
                    variant="outlined"
                  />
                );
              }}
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
