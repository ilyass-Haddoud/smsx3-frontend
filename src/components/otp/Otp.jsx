import OTPInput from "react-otp-input";
import "./otp.css";
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import otpSchema from "./otpValidation";
import loginRequest from "../../features/login/loginApi";
import { toast } from "react-toastify";
import { useEffect } from "react";

const Otp = () => {
  const dispatch = useDispatch();
  const loginState = useSelector((state) => state.loginReducer);

  const otpStyle = {
    padding: "10px",
    border: "1px #666666 solid",
    borderRadius: "5px",
    fontSize: "medium",
  };
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(otpSchema) });
  const checkErrorsAndNotify = () => {
    if (Object.keys(errors).length !== 0) {
      toast.error("Veuillez insérer le code otp.", {
        theme: "colored",
      });
    }
  };
  useEffect(() => {
    checkErrorsAndNotify();
  }, [errors]);

  return (
    <form
      onSubmit={handleSubmit((data) => {
        dispatch(loginRequest({ ...loginState.user, otp: data.otp }));
      })}
    >
      <header>Authentification à Deux Facteurs</header>
      <label>
        Votre connexion est protégée avec une application d'authentification.
        Veuillez saisir votre code d'authentification ci-dessous.
      </label>
      <Controller
        control={control}
        name="otp"
        render={({ field: { value, onChange } }) => {
          return (
            <OTPInput
              inputStyle={otpStyle}
              value={value}
              onChange={onChange}
              shouldAutoFocus={true}
              numInputs={6}
              renderSeparator={<span>-</span>}
              renderInput={(props) => <input {...props} />}
            />
          );
        }}
      />
      <button disabled={loginState.isLoading}>
        {loginState.isLoading ? "Chargement..." : "Se connecter"}
      </button>
    </form>
  );
};

export default Otp;
