import * as yup from "yup";

const loginSchema = yup
  .object({
    email: yup.string().required("Email required").email("Invalid email"),
    password: yup.string().required("Password required"),
    otp: yup.string().length(6),
  })
  .required();

export default loginSchema;
