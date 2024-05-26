import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Stack } from "@mui/material";
import { Controller, useForm, useFieldArray } from "react-hook-form";
import { DataGrid } from '@mui/x-data-grid';
import InvoiceScanning from "./InvoiceScanning";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from 'uuid';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import addInvoiceRequest from "../../../features/invoices/invoiceApi";
import {jwtDecode} from 'jwt-decode';


const AddInvoice = () => {
  const token = localStorage.getItem("token");
  const decodedToken = token && jwtDecode(token);
  const [openModal, setOpenModal] = useState(true);
  const formDataKeys = {
    site: "",
    typeFacture: "",
    numeroPiece: "",
    dateComptable: "",
    tiers: "",
    collectif: "",
    devise: "",
    bonAPayer: "",
    documentOrigine: "",
    dateOrigine: "",
    referenceInterne: "",
    commentaires0: "",
    commentaires1: "",
    commentaires2: "",
    totalHTLignes: "",
    totalTaxes: "",
    montantTTC: "",
    etat: "",
    texteEntete71: "",
    texteEntete72: "",
    textePied81: "",
    textePied82: "",
    items: []
  };

  const newInvoice = useSelector(state => state.invoiceReducer.newInvoice);
  const dispatch = useDispatch();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
    setValue,
    getValues,
    watch
  } = useForm({
    defaultValues: formDataKeys
  });

  const { fields, append, remove, update } = useFieldArray({
    control,
    name: "items"
  });

  const initializeForm = (invoice) => {
    const updatedInvoice = { ...formDataKeys, ...invoice };
    if (!updatedInvoice.items) {
      updatedInvoice.items = [];
    } else {
      updatedInvoice.items = updatedInvoice.items.map(item => ({
        origineLigne: "",
        numeroOrigine: "",
        ligneOrigine: "",
        sequenceOrigine: "",
        article: "",
        designation: "",
        uniteFacturation: "",
        quantiteFacturee: "",
        prixNet: "",
        montantLigneHT: "",
        valeurRemiseFrais1: "",
        valeurRemiseFrais2: "",
        valeurRemiseFrais3: "",
        affaire: "",
        texteLigne91: "",
        texteLigne92: "",
        ...item
      }));
    }
    reset(updatedInvoice);
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const formatDate = (dateString) => {
    const [day, month, year] = dateString.split('/');
    return `${year}-${month}-${day}`;
  };

  const handleSubmitForm = async (data) => {
    const items = getValues("items");
    const invalidItems = items.some(item => 
      !item.origineLigne || 
      !item.numeroOrigine || 
      !item.article || 
      !item.uniteFacturation || 
      !item.quantiteFacturee || 
      !item.montantLigneHT
    );

    if (invalidItems) {
      toast.error("Veuillez remplir tous les champs obligatoires.", {
        theme: "colored",
      });
      return;
    }
    const formattedData = {
      site: data.site,
      typeFacture: data.typeFacture,
      numeroPiece: data.numeroPiece,
      dateComptable: formatDate(data.dateComptable),
      tiers: data.tiers,
      collectif: data.collectif,
      devise: data.devise,
      bonAPayer: parseInt(data.bonAPayer),
      documentOrigine: data.documentOrigine,
      dateOrigine: formatDate(data.dateOrigine),
      referenceInterne: data.referenceInterne,
      commentaires0: data.commentaires0,
      commentaires1: data.commentaires1,
      commentaires2: data.commentaires2,
      totalHTLignes: parseFloat(data.totalHTLignes),
      totalTaxes: parseFloat(data.totalTaxes),
      montantTTC: parseFloat(data.montantTTC),
      etat: parseInt(data.etat),
      texteEntete71: data.texteEntete71,
      texteEntete72: data.texteEntete72,
      textePied81: data.textePied81,
      textePied82: data.textePied82,
      items: data.items.map(item => ({
          origineLigne: item.origineLigne,
          numeroOrigine: item.numeroOrigine,
          ligneOrigine: item.ligneOrigine,
          sequenceOrigine: item.sequenceOrigine,
          article: item.article,
          designation: item.designation,
          uniteFacturation: item.uniteFacturation,
          quantiteFacturee: parseInt(item.quantiteFacturee),
          prixNet: parseFloat(item.prixNet),
          montantLigneHT: parseFloat(item.montantLigneHT),
          valeurRemiseFrais1: item.valeurRemiseFrais1,
          valeurRemiseFrais2: item.valeurRemiseFrais2,
          valeurRemiseFrais3: item.valeurRemiseFrais3,
          affaire: item.affaire,
          texteLigne91: item.texteLigne91,
          texteLigne92: item.texteLigne92,
      }))
  };
    console.log(formattedData);
    dispatch(addInvoiceRequest({requestData: formattedData, token, decodedToken}));
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

  const [openScanningModal, setOpenScanningModal] = useState(false);
  
  useEffect(() => {
    if (newInvoice) {
      initializeForm(newInvoice);
    }
  }, [newInvoice, reset]);

  const processRowUpdate = (newRow, oldRow) => {
    const updatedItems = [...getValues("items")];
    const index = updatedItems.findIndex(item => item.code === oldRow.code);
    if (index !== -1) {
      updatedItems[index] = newRow;
      setValue("items", updatedItems);
    }
    return newRow;
  };
  
  const handleRowEditStop = (params, event) => {
    const updatedItems = [...getValues("items")];
    const index = updatedItems.findIndex(item => item.code === params.id);
    if (index !== -1) {
      const fieldName = params.field;
      const newValue = event.target.value;
      updatedItems[index][fieldName] = newValue;
      setValue("items", updatedItems);
    }
  };

  const renderHeaderWithAsterisk = (headerName) => (
    <span>
      {headerName} <span style={{ color: "red" }}>*</span>
    </span>
  );

  const columns = [
    { field: 'origineLigne', headerName: renderHeaderWithAsterisk('Origine Ligne'), width: 150, editable: true },
    { field: 'numeroOrigine', headerName: renderHeaderWithAsterisk('Numéro Origine'), width: 150, editable: true },
    { field: 'ligneOrigine', headerName: 'Ligne Origine', width: 150, editable: true },
    { field: 'sequenceOrigine', headerName: 'Séquence Origine', width: 150, editable: true },
    { field: 'article', headerName: renderHeaderWithAsterisk('Article'), width: 150, editable: true },
    { field: 'designation', headerName: 'Désignation', width: 150, editable: true },
    { field: 'uniteFacturation', headerName: renderHeaderWithAsterisk('Unité Facturation'), width: 150, editable: true },
    { field: 'quantiteFacturee', headerName: renderHeaderWithAsterisk('Quantité Facturée'), width: 150, editable: true },
    { field: 'prixNet', headerName: 'Prix Net', width: 150, editable: true },
    { field: 'montantLigneHT', headerName: renderHeaderWithAsterisk('Montant Ligne HT'), width: 150, editable: true },
    { field: 'valeurRemiseFrais1', headerName: 'Remise/Frais 1', width: 150, editable: true },
    { field: 'valeurRemiseFrais2', headerName: 'Remise/Frais 2', width: 150, editable: true },
    { field: 'valeurRemiseFrais3', headerName: 'Remise/Frais 3', width: 150, editable: true },
    { field: 'affaire', headerName: 'Affaire', width: 150, editable: true },
    { field: 'texteLigne91', headerName: 'Texte Ligne 91', width: 150, editable: true },
    { field: 'texteLigne92', headerName: 'Texte Ligne 92', width: 150, editable: true },
  ];

  const requiredFields = [
    "site",
    "typeFacture",
    "dateComptable",
    "tiers",
    "collectif",
    "devise",
    "bonAPayer",
    "documentOrigine",
    "dateOrigine",
    "totalHTLignes"
  ];

  const requiredItemFields = [
    "origineLigne",
    "numeroOrigine",
    "article",
    "uniteFacturation",
    "quantiteFacturee",
    "montantLigneHT"
  ];

  return (
    <div>
      <Button variant="contained" color="success" onClick={() => setOpenScanningModal(true)}>
        Ajouter une facture
      </Button>
      {!newInvoice && <InvoiceScanning open={openScanningModal} setOpen={setOpenScanningModal} />}
      {newInvoice && (
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
              maxHeight: '90vh',
              overflowY: 'auto'
            }}
          >
            <Typography sx={{ marginBottom: "2rem" }} variant="h6" gutterBottom>
              Ajouter une facture
            </Typography>
            <form onSubmit={handleSubmit(handleSubmitForm)}>
              <Grid container spacing={2}>
                {Object.keys(formDataKeys).map((key) => (
                  key !== 'items' && (
                    <Grid key={key} item xs={6} sm={3}>
                      <Controller
                        control={control}
                        name={key}
                        rules={{ required: requiredFields.includes(key) }}
                        render={({ field: { value, onChange } }) => (
                          <TextField
                            label={
                              <span>
                                {key.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
                                {requiredFields.includes(key) && <span style={{ color: "red" }}> *</span>}
                              </span>
                            }
                            value={value}
                            onChange={onChange}
                            fullWidth
                            sx={{ mb: 2 }}
                            error={errors[key]}
                          />
                        )}
                      />
                    </Grid>
                  )
                ))}
              </Grid>
              <Typography variant="h7" gutterBottom>
                Articles :
              </Typography>
              <Box sx={{ height: 400, width: '100%', mb: 2, mt: 1 }}>
                <DataGrid
                  rows={fields}
                  columns={columns}
                  processRowUpdate={processRowUpdate}
                  onRowEditStop={handleRowEditStop}
                  getRowId={(row) => row.code}
                />
              </Box>
              <Button
                variant="contained"
                color="success"
                onClick={() => append({
                  code: uuidv4(),
                  origineLigne: "",
                  numeroOrigine: "",
                  ligneOrigine: "",
                  sequenceOrigine: "",
                  article: "",
                  designation: "",
                  uniteFacturation: "",
                  quantiteFacturee: "",
                  prixNet: "",
                  montantLigneHT: "",
                  valeurRemiseFrais1: "",
                  valeurRemiseFrais2: "",
                  valeurRemiseFrais3: "",
                  affaire: "",
                  texteLigne91:"",
                  texteLigne92: ""
                })}
                sx={{ mb: 2, mr: 2 }}
              >
                Ajouter un article
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={() => remove(fields.length - 1)}
                sx={{ mb: 2 }}
              >
                Supprimer le dernier article
              </Button>
              <hr/>
              <Stack direction="row" spacing={1} marginTop={2}>
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
      )}
    </div>
  );
};

export default AddInvoice;
