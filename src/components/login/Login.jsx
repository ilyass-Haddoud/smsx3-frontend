import SideImage from "../../assets/login/c3tRg7Nt0Z.jpg";
import { GoEye } from "react-icons/go";
import { GoEyeClosed } from "react-icons/go";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import loginSchema from "./loginValidation";
import { useState } from "react";
import "./login.css";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../../features/loginSlice";
import Otp from "../otp/Otp";

const Login = () => {
  const [step, setStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const dispatch = useDispatch();
  const loginState = useSelector((state) => state.loginReducer);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(loginSchema) });
  const handlePasswordVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className="login">
      <div className="login_sidedImage">
        <img src={SideImage} alt="suppliers_image" />
      </div>
      {step == 0 && (
        <div className="login_form">
          <form
            onSubmit={handleSubmit((data) => {
              dispatch(setCredentials(data));
              setStep(1);
            })}
          >
            <header>Sign in</header>

            <div className="form_input_group">
              <label>Email or phone number</label>
              <input type="email" {...register("email")} />
              {errors.email && (
                <span className="error">{errors.email.message}</span>
              )}
            </div>
            <div className="form_input_group">
              <div className="password_metadata">
                <label>Password</label>
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
              {errors.password && (
                <span className="error">{errors.password.message}</span>
              )}
            </div>
            <div className="form_input_group">
              <label>Select your role: </label>
              <select {...register("role")} defaultValue="user">
                <option value="admin">Admin</option>
                <option value="supplier">Supplier</option>
                <option value="user">User</option>
              </select>
            </div>
            <button>Next</button>
            <div className="remember">
              <input type="checkbox" {...register("remember")} />
              <p>Remember me</p>
            </div>
            <footer>
              Don't have an account ? <strong>Sign up</strong>
            </footer>
          </form>
        </div>
      )}
      {step == 1 && (
        <div className="otp_form">
          <Otp />
        </div>
      )}
    </div>
  );
};

export default Login;
