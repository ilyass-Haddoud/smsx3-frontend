import React, { useEffect, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { addInvoice } from "../../../features/invoices/invoiceSlice";



const AddInvoice = () => {
  const [openModal, setOpenModal] = useState(true);
  const formDataKeys = {
    site_vente:"",
    numero_facture:"",
    type_facture:"",
    numero_piece:"",
    date:"",
    fournisseur:"",
    raison_sociale:"",
    devise:"",
    debut_echeance:"",
    adresse:"",
    condition_paiement:"",
    etat_facture:"",
    total_ttc:"",
    document: null,
  };

  const newInvoice = useSelector(state => state.invoiceReducer.newInvoice);
  const dispatch = useDispatch();
  
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
    // console.log(data.document);
    // const formData = new FormData();
    // formData.append("document", data.document); // Assuming 'document' is the name of the file field
    // try {
    //   const response = await axios.post("http://127.0.0.1:5000/extract_fields", formData, {
    //     headers: {
    //       "Content-Type": "multipart/form-data",
    //     },
    //   });
    //   const result = response.data;
    //   console.log(result);
    // } catch (error) {
    //   console.error("Error uploading file: ", error);
    // }
    console.log(data);
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
  useEffect(() => {
    if(newInvoice) {
      console.log(newInvoice);
      reset(newInvoice)
    };
  },[newInvoice]);

  return (
    <div>
      <Button variant="contained" color="success" onClick={()=>setOpenScanningModal(true)}>
        Ajouter une facture
      </Button>
      {!newInvoice && <InvoiceScanning open={openScanningModal} setOpen={setOpenScanningModal}/>}
      {
        newInvoice &&
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
          <form onSubmit={handleSubmit(handleSubmitForm)}>
          <Grid container spacing={2}>
            {Object.keys(formDataKeys).map((key) => (
              <Grid key={key} item xs={6} sm={3}>
                {key === "date" ||
                 key == "debut_echeance" ? (
                    <Controller
                      control={control}
                      name={key}
                      render={({ field: { value, onChange } }) => {
                        const formattedDate = value ? value.split('/').reverse().join('-') : '';
                        return (
                          <TextField
                          label={key.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
                          value={formattedDate}
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
                      name={key}
                      render={() => {
                        return (
                          <TextField
                          type="file"
                          accept=".pdf, .jpg, .jpeg, .png"
                          onChange={(e) => {
                            const file = e.target.files[0];
                            reset({ ...newInvoice, [key]: file });
                          }}
                          sx={{ mb: 2}}
                        />
                        );
                    }}/>
                ) : (
                  <Controller
                      control={control}
                      name={key}
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
        </Modal>
      }
    </div>
  );
};

export default AddInvoice;
