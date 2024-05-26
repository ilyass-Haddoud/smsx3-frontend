import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {getInvoiceByIdRequest, updateInvoiceRequest} from "../features/invoices/invoiceApi"
import {addInvoiceToSageRequest} from "../features/sageInvoices/sageInvoiceApi" 
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import {jwtDecode} from 'jwt-decode';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from "react-toastify";


const Invoice = () => {
  const { id } = useParams();
  const token = localStorage.getItem("token");
  const decodedToken = token && jwtDecode(token);
  const isAdmin = decodedToken && decodedToken.roles[0] === "Administrateur";
  const [isToastDisplayed, setIsToastDisplayed] = useState(false);


  const dispatch = useDispatch();
  const navigate = useNavigate();
  const invoiceState = useSelector(state => state.invoiceReducer);
  const sageInvoiceState = useSelector(state => state.sageInvoiceReducer);
  const [invoiceData, setInvoiceData] = useState({
    site: '',
    typeFacture: '',
    numeroPiece: '',
    dateComptable: '',
    tiers: '',
    collectif: '',
    devise: '',
    bonAPayer: '',
    documentOrigine: '',
    dateOrigine: '',
    referenceInterne: '',
    commentaires0: '',
    commentaires1: '',
    commentaires2: '',
    totalHTLignes: '',
    totalTaxes: '',
    montantTTC: '',
    etat: '',
    texteEntete71: '',
    texteEntete72: '',
    textePied81: '',
    textePied82: '',
    items: []
  });

  const etats = {
    4: "Transmise au service metier",
    5: "Transmise au service finances et comptabilité",
    6: "En attente d'information",
    7: "Rejetée par le service metier"
  };
  

  const [selectedItem, setSelectedItem] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    dispatch(getInvoiceByIdRequest({requestData:{id},token,decodedToken}))
  }, [dispatch]);

  useEffect(() => {
    if (invoiceState.invoiceToUpdate) {
      setInvoiceData(invoiceState.invoiceToUpdate);
    }
  }, [invoiceState.invoiceToUpdate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInvoiceData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleItemChange = (e) => {
    const { name, value } = e.target;
    setSelectedItem((prevItem) => ({
      ...prevItem,
      [name]: value,
    }));
  };

  const handleEditClick = (row) => {
    setSelectedItem(row);
    setOpen(true);
  };

  const handleSave = () => {
    setInvoiceData((prevData) => ({
      ...prevData,
      items: prevData.items.map((item) =>
        item.id === selectedItem.id ? selectedItem : item
      ),
    }));
    setOpen(false);
  };

  const handleSaveGlobally = async () => {
    try {
      if (invoiceData.etat === "5") {
        await dispatch(addInvoiceToSageRequest({ requestData: invoiceData, token, decodedToken }));
      }
      await dispatch(updateInvoiceRequest({ requestData: invoiceData, token, decodedToken }));
      navigate("/dashboard");
    } catch (error) {
      console.error("Bro Une erreur s'est produite lors de la sauvegarde globale :", error);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const isEtatDisabled = () => {
    return invoiceData.etat === 5;
  };


  const columns = [
    { field: 'article', headerName: 'Article', flex: 1 },
    { field: 'designation', headerName: 'Désignation', flex: 1 },
    { field: 'quantiteFacturee', headerName: 'Quantité Facturée', flex: 1 },
    {
      field: 'edit',
      headerName: 'Edit',
      renderCell: (params) => (
        <IconButton onClick={() => handleEditClick(params.row)}>
          <EditIcon sx={{color: 'white'}}/>
        </IconButton>
      ),
    },
  ];

  return (
    <Box sx={{ p: 3, backgroundColor: 'grey', minHeight: '100vh' }}>
      {
        sageInvoiceState.adding && toast.info("Sending to Sage x3.", {
          theme: "colored",
        })
      }
      {
        !sageInvoiceState.adding && sageInvoiceState.added && !isToastDisplayed && (
          toast.success("La facture a été correctement téléversée dans X3.", {
            theme: "colored",
          }),
          setIsToastDisplayed(true)
        )
      }
      {
        sageInvoiceState.erros && (
          toast.error("Erreur de creation de facture", {
            theme: "colored",
          })
        )
      }
      {
        invoiceState.isLoading &&
        <Box sx={{ display: 'flex' }}>
          <CircularProgress color="success" />
        </Box>
      }
      {
        invoiceState.errors &&
        <Alert severity="error">
          Error fetching invoice data.
        </Alert>
      }
      {
        !invoiceState.isLoading && !invoiceState.errors &&
        <>
          <Typography variant="h4" gutterBottom color="white">Détails de facture</Typography>
          <Typography variant="h5" gutterBottom mt={4} color="white">Général</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                margin="normal"
                label="Site"
                name="site"
                value={invoiceData.site}
                onChange={handleInputChange}
                InputLabelProps={{ style: { color: 'white' } }}
                InputProps={{ style: { color: 'white' } }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                margin="normal"
                label="Type Facture"
                name="typeFacture"
                value={invoiceData.typeFacture}
                onChange={handleInputChange}
                InputLabelProps={{ style: { color: 'white' } }}
                InputProps={{ style: { color: 'white' } }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                margin="normal"
                label="Numero Piece"
                name="numeroPiece"
                value={invoiceData.numeroPiece}
                onChange={handleInputChange}
                InputLabelProps={{ style: { color: 'white' } }}
                InputProps={{ style: { color: 'white' } }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                margin="normal"
                label="Date Comptable"
                name="dateComptable"
                value={invoiceData.dateComptable}
                onChange={handleInputChange}
                InputLabelProps={{ style: { color: 'white' } }}
                InputProps={{ style: { color: 'white' } }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                margin="normal"
                label="Tiers"
                name="tiers"
                value={invoiceData.tiers}
                onChange={handleInputChange}
                InputLabelProps={{ style: { color: 'white' } }}
                InputProps={{ style: { color: 'white' } }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                margin="normal"
                label="Collectif"
                name="collectif"
                value={invoiceData.collectif}
                onChange={handleInputChange}
                InputLabelProps={{ style: { color: 'white' } }}
                InputProps={{ style: { color: 'white' } }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                margin="normal"
                label="Devise"
                name="devise"
                value={invoiceData.devise}
                onChange={handleInputChange}
                InputLabelProps={{ style: { color: 'white' } }}
                InputProps={{ style: { color: 'white' } }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                margin="normal"
                label="Bon à Payer"
                name="bonAPayer"
                value={invoiceData.bonAPayer}
                onChange={handleInputChange}
                InputLabelProps={{ style: { color: 'white' } }}
                InputProps={{ style: { color: 'white' } }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                margin="normal"
                label="Document Origine"
                name="documentOrigine"
                value={invoiceData.documentOrigine}
                onChange={handleInputChange}
                InputLabelProps={{ style: { color: 'white' } }}
                InputProps={{ style: { color: 'white' } }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                margin="normal"
                label="Date Origine"
                name="dateOrigine"
                value={invoiceData.dateOrigine}
                onChange={handleInputChange}
                InputLabelProps={{ style: { color: 'white' } }}
                InputProps={{ style: { color: 'white' } }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                margin="normal"
                label="Référence Interne"
                name="referenceInterne"
                value={invoiceData.referenceInterne}
                onChange={handleInputChange}
                InputLabelProps={{ style: { color: 'white' } }}
                InputProps={{ style: { color: 'white' } }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                margin="normal"
                label="Commentaires 0"
                name="commentaires0"
                value={invoiceData.commentaires0}
                onChange={handleInputChange}
                InputLabelProps={{ style: { color: 'white' } }}
                InputProps={{ style: { color: 'white' } }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                margin="normal"
                label="Commentaires 1"
                name="commentaires1"
                value={invoiceData.commentaires1}
                onChange={handleInputChange}
                InputLabelProps={{ style: { color: 'white' } }}
                InputProps={{ style: { color: 'white' } }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                margin="normal"
                label="Commentaires 2"
                name="commentaires2"
                value={invoiceData.commentaires2}
                onChange={handleInputChange}
                InputLabelProps={{ style: { color: 'white' } }}
                InputProps={{ style: { color: 'white' } }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                margin="normal"
                label="Total HT Lignes"
                name="totalHTLignes"
                value={invoiceData.totalHTLignes}
                onChange={handleInputChange}
                InputLabelProps={{ style: { color: 'white' } }}
                InputProps={{ style: { color: 'white' } }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                margin="normal"
                label="Total Taxes"
                name="totalTaxes"
                value={invoiceData.totalTaxes}
                onChange={handleInputChange}
                InputLabelProps={{ style: { color: 'white' } }}
                InputProps={{ style: { color: 'white' } }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                margin="normal"
                label="Montant TTC"
                name="montantTTC"
                value={invoiceData.montantTTC}
                onChange={handleInputChange}
                InputLabelProps={{ style: { color: 'white' } }}
                InputProps={{ style: { color: 'white' } }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <FormControl fullWidth margin="normal">
                <InputLabel style={{ color: 'white' }}>État</InputLabel>
                <Select
                  label="État"
                  name="etat"
                  // disabled={!isAdmin}
                  value={invoiceData.etat}
                  onChange={handleInputChange}
                  style={{ color: 'white' }}
                  MenuProps={{
                    PaperProps: {
                      style: {
                        backgroundColor: '#424242', 
                        color: 'white'
                      }
                    }
                  }}
                >
                  {Object.entries(etats).map(([key, value]) => (
                    <MenuItem key={key} value={key}>
                      {value}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                margin="normal"
                label="Texte Entête 71"
                name="texteEntete71"
                value={invoiceData.texteEntete71}
                onChange={handleInputChange}
                InputLabelProps={{ style: { color: 'white' } }}
                InputProps={{ style: { color: 'white' } }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                margin="normal"
                label="Texte Entête 72"
                name="texteEntete72"
                value={invoiceData.texteEntete72}
                onChange={handleInputChange}
                InputLabelProps={{ style: { color: 'white' } }}
                InputProps={{ style: { color: 'white' } }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                margin="normal"
                label="Texte Pied 81"
                name="textePied81"
                value={invoiceData.textePied81}
                onChange={handleInputChange}
                InputLabelProps={{ style: { color: 'white' } }}
                InputProps={{ style: { color: 'white' } }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                margin="normal"
                label="Texte Pied 82"
                name="textePied82"
                value={invoiceData.textePied82}
                onChange={handleInputChange}
                InputLabelProps={{ style: { color: 'white' } }}
                InputProps={{ style: { color: 'white' } }}
              />
            </Grid>
          </Grid>

          <Typography variant="h5" gutterBottom mt={4} color="white">Articles</Typography>
          <Box sx={{ height: 400, width: '100%' }}>
            <DataGrid
              rows={invoiceData.items || []}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
              sx={{
                '& .MuiDataGrid-columnHeaders': {
                  backgroundColor: 'white',
                  color: 'black',
                },
                '& .MuiDataGrid-cell': {
                  color: 'white',
                },
                '& .MuiDataGrid-footerContainer': {
                  backgroundColor: 'white',
                  color: 'black',
                },
                backgroundColor: 'black',
                borderColor: 'white',
              }}
            />
          </Box>

          <Button onClick={handleSaveGlobally} color="primary" variant="contained" sx={{ mt: 2 }}>
            Save
          </Button>

          {selectedItem && (
            <Dialog open={open} onClose={handleClose}>
              <DialogTitle>Edit Item</DialogTitle>
              <DialogContent>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      margin="dense"
                      label="ID"
                      name="id"
                      value={selectedItem.id}
                      onChange={handleItemChange}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      margin="dense"
                      label="Origine Ligne"
                      name="origineLigne"
                      value={selectedItem.origineLigne}
                      onChange={handleItemChange}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      margin="dense"
                      label="Numero Origine"
                      name="numeroOrigine"
                      value={selectedItem.numeroOrigine}
                      onChange={handleItemChange}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      margin="dense"
                      label="Ligne Origine"
                      name="ligneOrigine"
                      value={selectedItem.ligneOrigine}
                      onChange={handleItemChange}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      margin="dense"
                      label="Séquence Origine"
                      name="sequenceOrigine"
                      value={selectedItem.sequenceOrigine}
                      onChange={handleItemChange}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      margin="dense"
                      label="Article"
                      name="article"
                      value={selectedItem.article}
                      onChange={handleItemChange}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      margin="dense"
                      label="Désignation"
                      name="designation"
                      value={selectedItem.designation}
                      onChange={handleItemChange}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      margin="dense"
                      label="Unité Facturation"
                      name="uniteFacturation"
                      value={selectedItem.uniteFacturation}
                      onChange={handleItemChange}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      margin="dense"
                      label="Quantité Facturée"
                      name="quantiteFacturee"
                      value={selectedItem.quantiteFacturee}
                      onChange={handleItemChange}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      margin="dense"
                      label="Prix Net"
                      name="prixNet"
                      value={selectedItem.prixNet}
                      onChange={handleItemChange}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      margin="dense"
                      label="Montant Ligne HT"
                      name="montantLigneHT"
                      value={selectedItem.montantLigneHT}
                      onChange={handleItemChange}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      margin="dense"
                      label="Valeur Remise Frais 1"
                      name="valeurRemiseFrais1"
                      value={selectedItem.valeurRemiseFrais1}
                      onChange={handleItemChange}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      margin="dense"
                      label="Valeur Remise Frais 2"
                      name="valeurRemiseFrais2"
                      value={selectedItem.valeurRemiseFrais2}
                      onChange={handleItemChange}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      margin="dense"
                      label="Valeur Remise Frais 3"
                      name="valeurRemiseFrais3"
                      value={selectedItem.valeurRemiseFrais3}
                      onChange={handleItemChange}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      margin="dense"
                      label="Affaire"
                      name="affaire"
                      value={selectedItem.affaire}
                      onChange={handleItemChange}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      margin="dense"
                      label="Texte Ligne 91"
                      name="texteLigne91"
                      value={selectedItem.texteLigne91}
                      onChange={handleItemChange}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      margin="dense"
                      label="Texte Ligne 92"
                      name="texteLigne92"
                      value={selectedItem.texteLigne92}
                      onChange={handleItemChange}
                      fullWidth
                    />
                  </Grid>
                </Grid>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="primary">Cancel</Button>
                <Button onClick={handleSave} color="primary">Save</Button>
              </DialogActions>
            </Dialog>
          )}
        </>
      }
    </Box>
  );
};

export default Invoice;

