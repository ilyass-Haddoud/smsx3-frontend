import React, { useState, useCallback, useEffect } from "react";
import {
  DataGrid,
  GridActionsCellItem,
} from "@mui/x-data-grid";
import {
  Modal,
  Typography,
  Box,
  Button,
  TextField,
  Stack,
  CircularProgress
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import ExpandIcon from '@mui/icons-material/Expand';
import Grid from "@mui/material/Grid";
import { getInvoiceBySupplierIdRequest } from "../../features/invoices/invoiceApi";
import { useDispatch, useSelector } from "react-redux";
import {jwtDecode} from "jwt-decode";
import { useNavigate } from 'react-router-dom';
import SyncIcon from '@mui/icons-material/Sync';
import { getInvoicesFromSageRequest } from "../../features/sageInvoices/sageInvoiceApi";
import DownloadIcon from '@mui/icons-material/Download';
import axios from "axios";
import { toast } from "react-toastify";



const etats = {
  1 : "En attente",
  2 : "A validée",
  3 : "Validée",
  4 : "Transmise au service metier",
  5 : "Transmise au service finances et comptabilité",
  6 : "En attente d'information",
  7 : "Rejetée par le service metier"
}

const InvoicesTable = React.memo(() => {
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);

  const factures = useSelector(state=>state.invoiceReducer);
  const sageFactures = useSelector(state=>state.sageInvoiceReducer);
  const [syncing, setSyncing] = useState(false);

  const [editedInvoice, setEditedInvoice] = useState(null);
  const [editedValues, setEditedValues] = useState({});
  const navigate = useNavigate();


  const token = localStorage.getItem("token");
  const decodedToken = token && jwtDecode(token);
  const isAdmin = decodedToken && decodedToken.roles[0] === "Administrateur";


  useEffect(() => {
    dispatch(getInvoiceBySupplierIdRequest({ token, decodedToken }));
  }, [syncing]);
 
  const handleShowClick = useCallback(
    (invoice) => () => {
      setEditedInvoice(invoice);
      setEditedValues(invoice.row);
      setOpenModal(true);
    },
    []
  );

  const syncStatus = async (invoice_id, status) => {
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };
    const url = `http://localhost:8080/invoices/syncStatus/${invoice_id}`;
    try {
      const res = await axios.put(url, { etat: status }, config);
      const data = await res.data;
      return res.data;
    } catch (error) {
      if (error.response) {
        throw error.response.data;
      } else {
        throw new Error('An unexpected error occurred');
      }
    }
  };
  

  const handleSync = async () => {
    setSyncing(true);

    await dispatch(getInvoicesFromSageRequest({ requestData: decodedToken.name, token, decodedToken }));

    if(factures.invoices.length == 0 || sageFactures.invoices.length == 0)
      {
        toast.error("sage x3 not responding, please try again.", {
          theme: "colored",
        })
        setSyncing(false);
        return;
      }
  
    const updatedInvoices = factures.invoices
      .filter(invoice => [1, 2, 3, 5].includes(invoice.etat))
      .map(invoice => {
        const matchingInvoice = sageFactures.invoices.find(sageInvoice => sageInvoice.document_origine === invoice.documentOrigine);
        if (matchingInvoice) {
          return {
            ...invoice,
            etat: matchingInvoice.etat
          };
        }
        return null;
      })
      .filter(invoice => invoice !== null);
    ({updatedInvoices})
    if(updatedInvoices.length == 0) {
      toast.info("Factures à jours.", {
        theme: "colored",
      })
      setSyncing(false)
      return;
    }  
    
    for (const invoice of updatedInvoices) {
      try {
        const response = await syncStatus(invoice.id, parseInt(invoice.etat));
        toast.success("factures syncronisées avec succée.", {
          theme: "colored",
        })
      } catch (error) {
        console.error(`Failed to update status for invoice ${invoice.id}:`, error.message || error);
      }
    }
  
    setSyncing(false);
  };


  const handleDownload = async (invoice) => {
    if (!invoice.row.document) {
      console.log("Aucune facture trouvée");
      return;
    }
  
    const config = {
      headers: { Authorization: `Bearer ${token}` },
      responseType: 'blob' // Ensure the response is treated as a blob
    };
    
    const url = `http://localhost:8080/invoices/download/${invoice.row.document}`;
    try {
      const res = await axios.get(url, config);
  
      // Create a new Blob object using the response data of the file
      const blob = new Blob([res.data], { type: res.headers['content-type'] });
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = invoice.row.document; // Use the actual document name for download
      link.click();
  
      // Clean up by revoking the Object URL
      window.URL.revokeObjectURL(link.href);
    } catch (error) {
      console.error('Error downloading the file:', error);
      if (error.response) {
        toast.error("Failed to download the file. Please try again.", {
          theme: "colored",
        });
      } else {
        throw new Error('An unexpected error occurred');
      }
    }
  };
  
  

  const handleEditClick = useCallback((id) => () => {
      navigate(`/invoices/${id}`);
    },
    [navigate]
  );

  const handleCancelClick = useCallback(() => {
    setOpenModal(false);
  }, []);

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setEditedValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }, []);

  const getRowId = (row) =>{
    return row.id;
  }

  return (
    <>
      {factures.isLoading && 
        <Box sx={{ display: 'flex' }}>
          <CircularProgress color="success"/>
        </Box>
      }
      {
        !factures.isLoading &&
        <Box
          style={{
            height: "60vh",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "0rem",
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap:".3rem" }}>
            <Typography gutterBottom sx={{fontSize:"12px"}}>
              {!syncing ? "Synchroniser" : "Synchronisation en cours..."}
            </Typography>
            <SyncIcon fontSize="12" sx={{ cursor: "pointer" }} onClick={handleSync}/>
          </Box>
          <DataGrid
            sx={{ maxHeight: "100%", 
                  width: "100%",
                  '& .MuiDataGrid-columnHeader ,.MuiDataGrid-scrollbarFiller': {
                  backgroundColor: '#bebecb',
                  color: 'white'
                }}}
            rows={factures.invoices || []}
            getRowId={getRowId}
            columns={[
              {
                field: "numeroPiece",
                headerName: "Numéro de pièce",
                flex: 1,
              },
              {
                field: "tiers",
                headerName: "Code fournisseur",
                flex: 1,
              },
              { field: "etat", headerName: "État", flex: 1, valueGetter:(etat)=>etats[etat] },
              { field: "dateComptable", headerName: "Date comptable", flex: 1 },
              {
                field: "actions",
                type: "actions",
                headerName: "Actions",
                cellClassName: "actions",
                getActions: ({ id, ...invoice }) => {
                  return [
                    <GridActionsCellItem
                      key="show"
                      icon={<ExpandIcon />}
                      label="show"
                      className="textPrimary"
                      onClick={handleShowClick(invoice)}
                      color="inherit"
                    />,
                    <GridActionsCellItem
                      key="edit"
                      icon={<EditIcon />}
                      label="Edit"
                      onClick={handleEditClick(id)}
                      color="inherit"
                    />,
                    <GridActionsCellItem
                      key="download"
                      icon={<DownloadIcon />}
                      label="Edit"
                      onClick={()=>handleDownload(invoice)}
                      color="inherit"
                    />,
                  ];
                },
              },
            ]}
            rowsPerPageOptions={[10, 20, 30]}
          />
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
              <Typography sx={{ marginBottom: "2rem", color:"black" }} variant="h6" gutterBottom>
                Afficher la Facture
              </Typography>
              {editedInvoice && (
                <Grid container spacing={2}>
                  <Grid item xs={6} sm={3}>
                    <TextField
                      label="Site"
                      name="site"
                      value={editedValues.site}
                      fullWidth
                      onChange={handleInputChange}
                      sx={{ mb: 2 }}
                      disabled
                    />
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <TextField
                      label="Type de facture"
                      name="typeFacture"
                      value={editedValues.typeFacture}
                      fullWidth
                      onChange={handleInputChange}
                      sx={{ mb: 2 }}
                      disabled
                    />
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <TextField
                      label="Numéro de pièce"
                      name="numeroPiece"
                      value={editedValues.numeroPiece}
                      fullWidth
                      onChange={handleInputChange}
                      sx={{ mb: 2 }}
                      disabled
                    />
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <TextField
                      label="Date comptable"
                      name="dateComptable"
                      value={editedValues.dateComptable}
                      fullWidth
                      onChange={handleInputChange}
                      sx={{ mb: 2 }}
                      disabled
                    />
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <TextField
                      label="Tiers"
                      name="tiers"
                      value={editedValues.tiers}
                      fullWidth
                      onChange={handleInputChange}
                      sx={{ mb: 2 }}
                      disabled
                    />
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <TextField
                      label="Collectif"
                      name="collectif"
                      value={editedValues.collectif}
                      fullWidth
                      onChange={handleInputChange}
                      sx={{ mb: 2 }}
                      disabled
                    />
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <TextField
                      label="Devise"
                      name="devise"
                      value={editedValues.devise}
                      fullWidth
                      onChange={handleInputChange}
                      sx={{ mb: 2 }}
                      disabled
                    />
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <TextField
                      label="Bon à payer"
                      name="bonAPayer"
                      value={editedValues.bonAPayer}
                      fullWidth
                      onChange={handleInputChange}
                      sx={{ mb: 2 }}
                      disabled
                    />
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <TextField
                      label="Document origine"
                      name="documentOrigine"
                      value={editedValues.documentOrigine}
                      fullWidth
                      onChange={handleInputChange}
                      sx={{ mb: 2 }}
                      disabled
                    />
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <TextField
                      label="Date origine"
                      name="dateOrigine"
                      value={editedValues.dateOrigine}
                      fullWidth
                      onChange={handleInputChange}
                      sx={{ mb: 2 }}
                      disabled
                    />
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <TextField
                      label="Référence interne"
                      name="referenceInterne"
                      value={editedValues.referenceInterne}
                      fullWidth
                      onChange={handleInputChange}
                      sx={{ mb: 2 }}
                      disabled
                    />
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <TextField
                      label="Total HT"
                      name="totalHTLignes"
                      value={editedValues.totalHTLignes}
                      fullWidth
                      onChange={handleInputChange}
                      sx={{ mb: 2 }}
                      disabled
                    />
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <TextField
                      label="Total taxes"
                      name="totalTaxes"
                      value={editedValues.totalTaxes}
                      fullWidth
                      onChange={handleInputChange}
                      sx={{ mb: 2 }}
                      disabled
                    />
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <TextField
                      label="Montant TTC"
                      name="montantTTC"
                      value={editedValues.montantTTC}
                      fullWidth
                      onChange={handleInputChange}
                      sx={{ mb: 2 }}
                      disabled
                    />
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <TextField
                      label="Status"
                      name="etat"
                      value={editedValues.etat}
                      fullWidth
                      onChange={handleInputChange}
                      sx={{ mb: 2 }}
                      disabled
                    />
                  </Grid>
                </Grid>
              )}
              <Stack direction="row" spacing={2}>
                {/* <Button variant="contained" color="info" onClick={handleSaveClick}>
                  Modifier
                </Button> */}
                <Button variant="outlined" color="info" onClick={handleCancelClick}>
                  Fermer
                </Button>
              </Stack>
            </Box>
          </Modal>
        </Box>
      }
    </>
  );
});

export default InvoicesTable;
