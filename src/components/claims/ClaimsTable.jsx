import React, { useState, useCallback, useEffect } from "react";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { Modal, Typography, Box, Button, TextField, Stack, CircularProgress } from "@mui/material";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import Grid from "@mui/material/Grid";
import { useDispatch, useSelector } from "react-redux";
import { getClaimsRequest, getAllClaimsRequest } from "../../features/claims/claimApi";
import useJwt from "../../hooks/useJwt";

const ClaimsTable = React.memo(() => {
  const dispatch = useDispatch();
  const reclamations = useSelector(state=>state.claimReducer);
  const [openModal, setOpenModal] = useState(false);
  const [selectedReclamation, setSelectedReclamation] = useState(null)
  const {token, decodedToken} = useJwt();

  const handleDeleteClick = useCallback(()=>{},[]);

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

  useEffect(() => {
    if(decodedToken.role != "fournisseur"){
      dispatch(getAllClaimsRequest({token, decodedToken}));
    }else{
      dispatch(getClaimsRequest({token, decodedToken}));
    }
  },[])

  

  return (
    
    <>
      {reclamations.isLoading &&
        <Box sx={{ display: 'flex' }}>
          <CircularProgress color="success"/>
        </Box>
      }
      {!reclamations.isLoading && 
        <div style={{ height: "60vh", width: "100%", display: "flex", flexDirection: "column", gap: "2rem" }}>
        <DataGrid
          sx={{ maxHeight: "100%", width: "100%",'& .MuiDataGrid-columnHeader ,.MuiDataGrid-scrollbarFiller': {
            backgroundColor: '#bebecb',
            color: 'white'
          } }}
          rows={reclamations.claims ?? []}
          columns={
            [
              { field: "createdAt", headerName: "Date", flex: 1 },
              { field: "supplier", headerName: "Fournisseur", flex: 1, valueGetter: supplier=>supplier.bpsnum },
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
            ]
          }
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
                    value={selectedReclamation.createdAt}
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
      }
    </>
  );
});

export default ClaimsTable;
