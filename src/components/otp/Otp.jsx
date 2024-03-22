import OTPInput from "react-otp-input";
import "./otp.css";
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import otpSchema from "./otpValidation";
import loginRequest from "../../features/loginApi";

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

  return (
    <form
      onSubmit={handleSubmit((data) => {
        dispatch(loginRequest({ ...loginState.user, otp: data.otp }));
      })}
    >
      <header>Two Factor Authentication</header>
      <label>
        Your login is protected with an anthenticator app, please enter your
        authenticator code below
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
      <span className="error">{errors.otp?.message}</span>
      <button disabled={loginState.isLoading}>
        {loginState.isLoading ? "Signing..." : "Sign up"}
      </button>
    </form>
  );
};

export default Otp;
