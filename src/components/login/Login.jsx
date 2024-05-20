import SideImage from "../../assets/login/supplier_illustration.png";
import Sage from "../../assets/SageLogo.png";
import { GoEye } from "react-icons/go";
import { GoEyeClosed } from "react-icons/go";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import loginSchema from "./loginValidation";
import { useEffect, useState } from "react";
import "./login.css";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../../features/login/loginSlice";
import Otp from "../otp/Otp";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import loginRequest from "../../features/login/loginApi";
import { useNavigate } from "react-router-dom";
import { Box, CircularProgress } from "@mui/material";

const Login = () => {
  const [step, setStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();
  const loginState = useSelector(state => state.loginReducer);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(loginSchema) });
  const handlePasswordVisibility = () => {
    setIsVisible(!isVisible);
  };
  const checkErrorsAndNotify = () => {
    if (Object.keys(errors).length !== 0) {
      toast.error("Veuillez remplir tous les champs obligatoires.", {
        theme: "colored",
      });
    }
  };

  useEffect(() => {
    if (loginState.isLoggedIn) {
      navigate('/dashboard');
    }
  }, [loginState.isLoggedIn, navigate]);

  useEffect(() => {
    checkErrorsAndNotify();
  }, [errors]);

  return (
    <div className="login">
      {
        <div className="login_sidedImage">
        <img src={Sage} alt="sage" />
        <img src={SideImage} alt="suppliers_image" />
        </div>
      }
      {
        loginState.isLoading &&
        <Box className="login_form" sx={{ display: 'flex' }}>
          <CircularProgress color="success" />
        </Box>
      }
      {!loginState.isLoading && step == 0 && (
        <div className="login_form">
          <form
            onSubmit={handleSubmit((data) => {
              if(data.role != "fournisseur"){
                dispatch(loginRequest(data));
                return;
              }
              dispatch(setCredentials(data));
              setStep(1);
            })}
          >
            <header>Se connecter</header>

            <div className="form_input_group">
              <label>Mail ou numéro de téléphone</label>
              <input type="email" {...register("email")} />
            </div>
            <div className="form_input_group">
              <div className="password_metadata">
                <label>Mot de passe</label>
                {isVisible && (
                  <GoEyeClosed
                    style={{ cursor: "pointer" }}
                    onClick={handlePasswordVisibility}
                  />
                )}
                {!isVisible && (
                  <GoEye
                    style={{ cursor: "pointer" }}
                    onClick={handlePasswordVisibility}
                  />
                )}
              </div>
              <input
                type={isVisible ? "text" : "password"}
                {...register("password")}
              />
            </div>
            <div className="form_input_group">
              <label>Sélectionnez votre rôle : </label>
              <select {...register("role")} defaultValue="client">
                <option value="administrateur">Admin </option>
                <option value="fournisseur">Fournisseur</option>
                <option value="client">Client</option>
              </select>
            </div>
            <button>Suivant</button>
            <div className="remember">
              <input type="checkbox" {...register("remember")} />
              <p>Se souvenir de moi</p>
            </div>
            <footer>
              <div>
                Vous n'avez pas de compte ?
                <strong>
                  <Link to={"/auth/register"}> S'inscrire</Link>
                </strong>
              </div>
              <div>
                Mot de passe oublié ?
                <strong>
                  <Link to={"/forgot_password"}> Réinitialisation de mot de passe</Link>
                </strong>
                </div>
            </footer>
          </form>
        </div>
      )}
      {!loginState.isLoading && step == 1 && (
        <div className="otp_form">
          <Otp />
        </div>
      )}
    </div>
  );
};

export default Login;
