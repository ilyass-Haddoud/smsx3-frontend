import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Stack } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import axios from "axios";
import InvoiceScanning from "./InvoiceScanning";



const MyButtonWithModal = () => {
  const [openModal, setOpenModal] = useState(false);
  const formDataKeys = {
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
  };
  
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors,isSubmitting },
  } = useForm();

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleSubmitForm = async (data) => {
    console.log(data.document);
    const formData = new FormData();
    formData.append("document", data.document); // Assuming 'document' is the name of the file field
    try {
      const response = await axios.post("http://127.0.0.1:5000/extract_fields", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const result = response.data;
      console.log(result);
    } catch (error) {
      console.error("Error uploading file: ", error);
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleSaveClick = () => {
    handleCloseModal();
  };

  const handleCancelClick = () => {
    handleCloseModal();
  };

  const [openScanningModal,setOpenScanningModal] = useState(false);

  return (
    <div>
      <Button variant="contained" color="success" onClick={()=>setOpenScanningModal(true)}>
        Ajouter une facture
      </Button>
      <InvoiceScanning open={openScanningModal} setOpen={setOpenScanningModal}/>
      {/* <Modal
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
          <form onSubmit={handleSubmit(handleSubmitForm)}>
          <Grid container spacing={2}>
            {Object.keys(formDataKeys).map((key) => (
              <Grid key={key} item xs={6} sm={3}>
                {key === "date" ||
                key === "date_debut_periode" ||
                key === "date_fin_periode" ? (
                    <Controller
                      control={control}
                      name={key.replace(/_(\w)/g, (_, w) => w.toUpperCase())}
                      render={({ field: { value, onChange } }) => {
                        return (
                          <TextField
                          label={key.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
                          value={value}
                          onChange={onChange}
                          type="date"
                          fullWidth
                          sx={{ mb: 2 }}
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />
                        );
                    }}/>
                ) : key === "document" ? (
                  <Controller
                      control={control}
                      name={key.replace(/_(\w)/g, (_, w) => w.toUpperCase())}
                      render={() => {
                        return (
                          <TextField
                          type="file"
                          accept=".pdf, .jpg, .jpeg, .png"
                          onChange={(e) => {
                            const file = e.target.files[0];
                            reset({ ...formDataKeys, [key]: file });
                          }}
                          sx={{ mb: 2}}
                        />
                        );
                    }}/>
                ) : (
                  <Controller
                      control={control}
                      name={key.replace(/_(\w)/g, (_, w) => w.toUpperCase())}
                      render={({ field: { value, onChange } }) => {
                        return (
                          <TextField
                          label={key.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
                          value={value}
                          onChange={onChange}
                          fullWidth
                          sx={{ mb: 2 }}
                        />
                        );
                    }}/>
                )}
              </Grid>
            ))}
          </Grid>
          <Stack direction="row" spacing={1}>
            <Button variant="contained" color="info" type="submit">
              Ajouter
            </Button>
            <Button variant="outlined" color="info" onClick={handleCancelClick}>
              Annuler
            </Button>
          </Stack>
          </form>
        </Box>
      </Modal> */}
    </div>
  );
};

export default MyButtonWithModal;
