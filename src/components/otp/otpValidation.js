import * as yup from "yup";

const otpSchema = yup
  .object({
    otp: yup.string().required("otp code required").length(6),
  })
  .required();

export default otpSchema;
