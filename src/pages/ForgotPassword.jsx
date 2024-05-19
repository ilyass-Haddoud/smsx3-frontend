import React from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button, Box, Typography, Container } from '@mui/material';
import { toast } from 'react-toastify';
import axios from 'axios';

const ForgotPassword = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      let url = "http://localhost:8080/suppliers/forgot_password?email="+data.email
      await axios.get(url);
      toast.success('Email de réinitialisation envoyé avec succès');
    } catch (error) {
      toast.error('Erreur lors de l\'envoi de l\'email de réinitialisation');
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Réinitialiser le mot de passe
        </Typography>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            label="Adresse Email"
            {...register('email', { required: 'Ce champ est requis' })}
            error={!!errors.email}
            helperText={errors.email ? errors.email.message : ''}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
          >
            Envoyer l'email de réinitialisation
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default ForgotPassword;
