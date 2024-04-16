import * as yup from "yup";

const addClaimSchema = yup
  .object({
    entete: yup.string().required("Entete required"),
    message: yup.string().required("Message required"),
  })
  .required();

export default addClaimSchema;
