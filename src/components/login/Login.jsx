import SideImage from "../../assets/login/c3tRg7Nt0Z.jpg";
import { GoEye } from "react-icons/go";
import { GoEyeClosed } from "react-icons/go";
import "./login.css";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import loginSchema from "./loginValidation";
import { useState } from "react";
import OTPInput from "react-otp-input";
import axios from "axios";

const Login = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [loginStep, setLoginStep] = useState(0);
  const [otp, setOtp] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({ resolver: yupResolver(loginSchema) });
  const handlePasswordVisibility = () => {
    setIsVisible(!isVisible);
  };
  return (
    <div className="login">
      <div className="login_sidedImage">
        <img src={SideImage} alt="suppliers_image" />
      </div>
      <div className="login_form">
        <form
          onSubmit={handleSubmit((data) => {
            if (loginStep == 0) setLoginStep(1);
            if (loginStep == 1) {
              axios
                .post("http://localhost:8080/auth/login?otpCode=" + data.otp, {
                  email: data.email,
                  password: data.password,
                })
                .then(function (response) {
                  console.log(response);
                })
                .catch(function (error) {
                  console.log(error);
                });
            }
          })}
        >
          <header>{loginStep == 0 ? "Sign in" : "Verification Code"}</header>

          {loginStep == 0 && (
            <>
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
            </>
          )}

          {loginStep == 1 && (
            <div className="otp">
              <Controller
                name="otp"
                control={control}
                render={({ field }) => (
                  <OTPInput
                    inputStyle={{ width: 50, height: 50 }}
                    value={field.value}
                    onChange={field.onChange}
                    numInputs={6}
                    renderSeparator={<span>-</span>}
                    renderInput={(props) => <input {...props} />}
                  />
                )}
              />
              {errors.otp && (
                <span className="error">{errors.otp.message}</span>
              )}
            </div>
          )}

          <button>{loginStep == 0 ? "Next" : "Sign up"}</button>
          <div className="remember">
            <input type="checkbox" {...register("remember")} />
            <p>Remember me</p>
          </div>
          <footer>
            Don't have an account ? <strong>Sign up</strong>
          </footer>
        </form>
      </div>
    </div>
  );
};

export default Login;
