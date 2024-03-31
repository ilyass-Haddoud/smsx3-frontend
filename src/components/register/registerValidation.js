import * as yup from "yup";

export const baseInfoSchema = yup
  .object({
    BPSLNAME: yup.string().required("BPSLNAME name required"),
    BPSFNAME: yup.string().required("BPSFNAME name required"),
    BPSNUM: yup.string().required("BPSNUM required"),
    BPSNAM: yup.string().required("BPSNAM required"),
    BPAINV: yup.string().required("BPAINV required"),
    BPAADD: yup.string().required("BPAADD required"),
  })
  .required();

export const contactDetailsSchema = yup
  .object({
    BPSNUMTEL: yup
      .string()
      .required("BPSNUMTEL required")
      .email("Invalid email"),
    BPSADDEML: yup.string().required("BPSADDEML required"),
    BPSPASSE: yup.string().required("BPSPASSE required"),
  })
  .required();

export const additionalInfoSchema = yup
  .object({
    BPSGRU: yup.string().required("BPSGRU required"),
    BPSRSK: yup.string().required("BPSRSK required"),
    BSGCOD: yup.string().required("BSGCOD required"),
    BPTNUM: yup.string().required("BPTNUM required"),
    BPSNUMBPS: yup.string().required("BPSNUMBPS required"),
    BPSTYP: yup
      .string()
      .required("BPSTYP required")
      .oneOf(["normal", "prospect", "divers"], "Invalid BPSTYP value"),
    BPSREM: yup.string().required("BPSREM required"),
  })
  .required();
