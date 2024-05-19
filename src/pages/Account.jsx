import React, { useEffect, useState } from 'react';
import { TextField, Button, Modal, Box, Typography, Grid, createTheme, ThemeProvider, CssBaseline, CircularProgress } from '@mui/material';
import { grey } from '@mui/material/colors';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import getSupplierInfoRequest from '../features/loggedSupplier/loggedSupplierApi';
import changePasswordRequest from '../features/passwordChange/passwordChangeApi';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
    text: {
      primary: '#ffffff',
      secondary: grey[500],
    },
  },
});

const Account = () => {
  const dispatch = useDispatch();
  const loggedUserState = useSelector(state => state.loggedSupplierReducer);
  const passwordChangeState = useSelector(state => state.passwordChangeReducer);

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch
  } = useForm();

  const checkErrorsAndNotify = () => {
    if (Object.keys(errors).length !== 0) {
      toast.error("Veuillez remplir tous les champs correctement.", {
        theme: "colored",
      });
    }
    if (passwordChangeState.errors != null) {
      toast.error(passwordChangeState.errors, {
        theme: "colored",
      });
    }
    if (passwordChangeState.success) {
      toast.success(passwordChangeState.success, {
        theme: "colored",
      });
    }
  };

  const supplier = loggedUserState.loggedUser ? {
    'Identifiant': loggedUserState.loggedUser.bpsnum || '',
    'Raison sociale': loggedUserState.loggedUser.bpsnam || '',
    'Adresse de facturation': loggedUserState.loggedUser.bpainv || '',
    'Adresse par défaut': loggedUserState.loggedUser.bpaadd || '',
    'Observations': loggedUserState.loggedUser.bpsrem || '',
    'Groupe fournisseur': loggedUserState.loggedUser.bpsgru || '',
    'Niveau de risque': loggedUserState.loggedUser.bpsrsk || '',
    'Catégorie': loggedUserState.loggedUser.bsgcod || '',
    'Transporteur': loggedUserState.loggedUser.bptnum || '',
    'Numéro fournisseur': loggedUserState.loggedUser.bpsnumbps || '',
    'Numéro de téléphone': loggedUserState.loggedUser.bpsnumtel || '',
    'Email': loggedUserState.loggedUser.bpsaddeml || '',
    'Type': loggedUserState.loggedUser.bpstyp || '',
    'Prénom': loggedUserState.loggedUser.bpsfname || '',
    'Nom': loggedUserState.loggedUser.bpslname || '',
  } : {};

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const onSubmit = data => {
    console.log(data);
    dispatch(changePasswordRequest({currentPassword:data.currentPassword,newPassword:data.newPassword}))
    reset();
  };

  useEffect(() => {
    dispatch(getSupplierInfoRequest());
  }, [dispatch]);

  useEffect(() => {
    checkErrorsAndNotify();
  }, [errors, passwordChangeState.errors,passwordChangeState.success]);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <div style={{ backgroundColor: darkTheme.palette.background.default, minHeight: '100vh', padding: '20px' }}>
        <Typography variant="h4" component="h1" gutterBottom style={{ color: darkTheme.palette.text.primary }}>
          Information de compte
        </Typography>

        {loggedUserState.isLoading &&
          <Box sx={{ display: 'flex' }}>
            <CircularProgress color="success" />
          </Box>
        }
        {!loggedUserState.isLoading &&
          <Grid container spacing={2}>
            {Object.keys(supplier).map((key) => (
              <Grid item xs={12} sm={6} key={key}>
                <TextField
                  fullWidth
                  label={key}
                  value={supplier[key]}
                  InputProps={{
                    readOnly: true,
                    style: { color: darkTheme.palette.text.primary },
                  }}
                  InputLabelProps={{
                    style: { color: darkTheme.palette.text.secondary },
                  }}
                  variant="outlined"
                  disabled
                />
              </Grid>
            ))}
            <Grid item xs={12}>
              <Button variant="contained" color="primary" onClick={handleOpen}>
                Changer le mot de passe
              </Button>
            </Grid>
          </Grid>
        }

        <Modal open={open} onClose={handleClose}>
          <Box sx={style}>
            <Typography variant="h6" component="h2">
              Changer le mot de passe
            </Typography>
            {
              passwordChangeState.isLoading &&
              <Box sx={{ display: 'flex',marginTop:4 }}>
                <CircularProgress color="success" />
              </Box>
            }
            {
              !passwordChangeState.isLoading &&
              <Box component="form" noValidate autoComplete="off" sx={{ mt: 2 }} onSubmit={handleSubmit(onSubmit)}>
                <TextField
                  fullWidth
                  label="Mot de passe courant"
                  type="password"
                  margin="normal"
                  variant="outlined"
                  {...register('currentPassword', { required: 'Ce champ est requis' })}
                  error={!!errors.currentPassword}
                  helperText={errors.currentPassword ? errors.currentPassword.message : ''}
                  InputLabelProps={{
                    style: { color: darkTheme.palette.text.secondary },
                  }}
                />
                <TextField
                  fullWidth
                  label="Nouveau mot de passe"
                  type="password"
                  margin="normal"
                  variant="outlined"
                  {...register('newPassword', { required: 'Ce champ est requis' })}
                  error={!!errors.newPassword}
                  helperText={errors.newPassword ? errors.newPassword.message : ''}
                  InputLabelProps={{
                    style: { color: darkTheme.palette.text.secondary },
                  }}
                />
                <TextField
                  fullWidth
                  label="Confirmer nouveau mot de passe"
                  type="password"
                  margin="normal"
                  variant="outlined"
                  {...register('confirmNewPassword', { 
                    required: 'Ce champ est requis',
                    validate: value => value === watch('newPassword') || 'Les mots de passe ne correspondent pas'
                  })}
                  error={!!errors.confirmNewPassword}
                  helperText={errors.confirmNewPassword ? errors.confirmNewPassword.message : ''}
                  InputLabelProps={{
                    style: { color: darkTheme.palette.text.secondary },
                  }}
                />
                <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
                  Envoyer
                </Button>
              </Box>
            }
            
          </Box>
        </Modal>
      </div>
    </ThemeProvider>
  );
};

export default Account;
