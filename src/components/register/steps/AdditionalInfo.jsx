import { useForm } from "react-hook-form";
import { setCredentials } from "../../../features/register/registerSlice";
import { useDispatch } from "react-redux";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { Fragment } from "react";
import registerRequest from "../../../features/register/registerApi";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { additionalInfoSchema } from "../registerValidation";

const AdditionalInfo = ({ step, setStep }) => {
  const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialogContent-root": {
      padding: theme.spacing(2),
    },
    "& .MuiDialogActions-root": {
      padding: theme.spacing(1),
    },
  }));

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(additionalInfoSchema) });
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
    dispatch(registerRequest());
  };
  const handleClose = () => {
    setOpen(false);
    setStep((step) => step + 1);
  };
  const dispatch = useDispatch();
  const checkErrorsAndNotify = () => {
    if (Object.keys(errors).length !== 0) {
      toast.error("Veuillez remplir tous les champs obligatoires.", {
        theme: "colored",
      });
    }
  };
  useEffect(() => {
    checkErrorsAndNotify();
  }, [errors]);

  return (
    <div className="registerstep">
      <form
        onSubmit={handleSubmit((data) => {
          dispatch(setCredentials(data));
          setOpen(true);
        })}
      >
        <header>S'inscrire</header>
        <h3>Informations supplémentaires</h3>
        <div className="input_grp">
          <div className="form_input_group">
            <label htmlFor="">Fournisseur groupe <span style={{color:'red'}}>*</span></label>
            <input type="text" {...register("BPSGRU")} />
          </div>
          <div className="form_input_group">
            <label htmlFor="">Tiers risque <span style={{color:'red'}}>*</span></label>
            <input type="text" {...register("BPSRSK")} />
          </div>
        </div>
        <div className="input_grp">
          <div className="form_input_group">
            <label htmlFor="">Catégorie <span style={{color:'red'}}>*</span></label>
            <input type="text" {...register("BSGCOD")} />
          </div>
          <div className="form_input_group">
            <label htmlFor="">Transporteur <span style={{color:'red'}}>*</span></label>
            <input type="text" {...register("BPTNUM")} />
          </div>
        </div>
        <div className="input_grp">
          <div className="form_input_group">
            <label htmlFor="">N° fournisseur <span style={{color:'red'}}>*</span></label>
            <input type="text" {...register("BPSNUMBPS")} />
          </div>
          <div className="form_input_group">
            <label htmlFor="">Type de fournisseur <span style={{color:'red'}}>*</span></label>
            <select {...register("BPSTYP")}>
              <option value="normal">Normal</option>
              <option value="prospect">Prospect</option>
              <option value="divers">Divers</option>
            </select>
          </div>
        </div>
        <div className="form_input_group">
          <label htmlFor="">Observations <span style={{color:'red'}}>*</span></label>
          <input type="text" {...register("BPSREM")} />
        </div>
        <button>Soumettre</button>
      </form>
      <Fragment>
        <BootstrapDialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}
        >
          <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
            Confirmation
          </DialogTitle>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
          <DialogContent dividers>
            <Typography gutterBottom>
              Merci d'avoir fourni vos informations. Vos détails ont été reçus
              avec succès.
            </Typography>
            <Typography gutterBottom>
              Pour renforcer la sécurité de votre compte, nous allons maintenant
              générer un code QR que vous devrez scanner à l'aide de votre
              application d'authentification préférée, telle que Google
              Authenticator.
            </Typography>
            <Typography gutterBottom>
              Une fois scanné, vous recevrez un code à usage unique (OTP). Ce
              code OTP sera requis chaque fois que vous vous connectez à votre
              compte pour une sécurité accrue.
            </Typography>
            <Typography gutterBottom>
              Veuillez procéder à la soumission. Si des erreurs ou des
              modifications sont nécessaires, vous serez invité à mettre à jour
              le formulaire en conséquence.
            </Typography>
            <Typography gutterBottom>Merci pour votre coopération.</Typography>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleClose}>
              Ok
            </Button>
          </DialogActions>
        </BootstrapDialog>
      </Fragment>
    </div>
  );
};

export default AdditionalInfo;
