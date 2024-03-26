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
import { useState } from "react";
import { Fragment } from "react";
import registerRequest from "../../../features/register/registerApi";

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
  } = useForm();
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

  return (
    <div className="registerstep">
      <form
        onSubmit={handleSubmit((data) => {
          dispatch(setCredentials(data));
          setOpen(true);
        })}
      >
        <header>Sign Up</header>
        <h3>Additional Information</h3>
        <div>
          <div className="form_input_group">
            <label htmlFor="">Fournisseur groupe</label>
            <input type="text" {...register("BPSGRU")} />
          </div>
          <div className="form_input_group">
            <label htmlFor="">Tiers risque</label>
            <input type="text" {...register("BPSRSK")} />
          </div>
        </div>
        <div>
          <div className="form_input_group">
            <label htmlFor="">Catégorie</label>
            <input type="text" {...register("BSGCOD")} />
          </div>
          <div className="form_input_group">
            <label htmlFor="">Transporteur</label>
            <input type="text" {...register("BPTNUM")} />
          </div>
        </div>
        <div>
          <div className="form_input_group">
            <label htmlFor="">Numéro du client/fournisseur</label>
            <input type="text" {...register("BPSNUMBPS")} />
          </div>
          <div className="form_input_group">
            <label htmlFor="">Type de fournisseur</label>
            <input type="text" {...register("BPSTYP")} />
          </div>
        </div>
        <div className="form_input_group">
          <label htmlFor="">Observations</label>
          <input type="text" {...register("BPSREM")} />
        </div>
        <button>Submit</button>
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
              Thank you for providing your information. Your details have been
              received successfully.
            </Typography>
            <Typography gutterBottom>
              To enhance the security of your account, we will now generate a QR
              code that you need to scan using your preferred authentication
              app, such as Google Authenticator.
            </Typography>
            <Typography gutterBottom>
              Once scanned, you will receive a one-time password (OTP) code.
              This OTP code will be required every time you log in to your
              account for added security.
            </Typography>
            <Typography gutterBottom>
              Please proceed with submission. If there are any errors or changes
              needed, you will be prompted to update the form accordingly.
            </Typography>
            <Typography gutterBottom>
              Thank you for your cooperation.
            </Typography>
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
