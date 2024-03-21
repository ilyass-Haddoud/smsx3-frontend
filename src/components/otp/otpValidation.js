import * as yup from "yup";

const otpSchema = yup
  .object({
    otp: yup.string().required("OTP code required").length(6),
  })
  .required();

export default otpSchema;
