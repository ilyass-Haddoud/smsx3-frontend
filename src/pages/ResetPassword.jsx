import React from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button, Box, Typography, Container } from '@mui/material';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate, useSearchParams } from 'react-router-dom';

const ResetPassword = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  const token = searchParams.get('token');

  const onSubmit = async (data) => {
    try {
      await axios.post('http://localhost:8080/suppliers/reset_password?token='+token+'&newPassword='+data.newPassword);
      toast.success('Mot de passe réinitialisé avec succès');
      navigate('/login');
    } catch (error) {
      toast.error('Erreur lors de la réinitialisation du mot de passe');
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
            label="Nouveau mot de passe"
            type="password"
            {...register('newPassword', { required: 'Ce champ est requis' })}
            error={!!errors.newPassword}
            helperText={errors.newPassword ? errors.newPassword.message : ''}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            label="Confirmer nouveau mot de passe"
            type="password"
            {...register('confirmNewPassword', {
              required: 'Ce champ est requis',
              validate: value => value === watch('newPassword') || 'Les mots de passe ne correspondent pas'
            })}
            error={!!errors.confirmNewPassword}
            helperText={errors.confirmNewPassword ? errors.confirmNewPassword.message : ''}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
          >
            Réinitialiser le mot de passe
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default ResetPassword;
