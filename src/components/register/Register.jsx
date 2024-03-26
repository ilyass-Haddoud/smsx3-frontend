import { useState } from "react";
import SideImage from "../../assets/login/supplier_illustration_register.avif";
import Sage from "../../assets/SageLogo.png";
import "./register.css";
import BaseInfo from "./steps/BaseInfo";
import ContactDetails from "./steps/ContactDetails";
import AdditionalInfo from "./steps/AdditionalInfo";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import OtpScanning from "./steps/OtpScanning";
import { ToastContainer } from "react-toastify";

const Register = () => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "#ffebee",
    border: "2px solid #d32f2f",
    borderRadius: "8px",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
    padding: "16px",
    color: "#d32f2f",
  };

  const [open, setOpen] = useState(true);
  const handleClose = () => setOpen(false);
  const [step, setStep] = useState(1);
  return (
    <div className="register">
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Important Notice
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              This platform is exclusively dedicated to suppliers registered in
              the Sage X3 system. If you are not already a registered supplier
              in Sage X3, please refrain from registering on this portal. For
              existing suppliers in the Sage X3 system, please proceed with
              registration using your provided credentials. Thank you for your
              understanding.
            </Typography>
          </Box>
        </Modal>
      </div>
      <div className="register_sidedImage">
        <img src={Sage} alt="sage" />
        <img src={SideImage} alt="suppliers_image" />
      </div>
      {step == 1 && <BaseInfo step={step} setStep={setStep} />}
      {step == 2 && <ContactDetails step={step} setStep={setStep} />}
      {step == 3 && <AdditionalInfo step={step} setStep={setStep} />}
      {step == 4 && <OtpScanning step={step} setStep={setStep} />}
      <ToastContainer />
    </div>
  );
};

export default Register;
