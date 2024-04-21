import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useForm } from 'react-hook-form';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import { useState } from 'react';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export default function InvoiceScanning({ open, setOpen }) {
  const [isUploading, setIsUploading] = useState(false); // Nouvel état pour suivre l'état d'envoi de la requête
  const handleClose = () => setOpen(false);
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleFileSelect = async(event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("document", file);
    setIsUploading(true);
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
      } finally {
        setIsUploading(false);
        handleClose();
      }
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{...style, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          {isUploading ? (
            <CircularProgress color='success'/>
          ) : (
              <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
              >
                Upload file
                <VisuallyHiddenInput type="file" onChange={handleFileSelect} />
              </Button>
          )}
        </Box>
      </Modal>
    </div>
  );
}