import { useForm } from "react-hook-form";
import { setCredentials } from "../../../features/register/registerSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { GoEye, GoEyeClosed } from "react-icons/go";
import { yupResolver } from "@hookform/resolvers/yup";
import { contactDetailsSchema } from "../registerValidation";

const ContactDetails = ({ step, setStep }) => {
  const [isVisible, setIsVisible] = useState(false);
  const handlePasswordVisibility = () => {
    setIsVisible((setIsVisible) => !setIsVisible);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(contactDetailsSchema) });
  const dispatch = useDispatch();
  const checkErrorsAndNotify = () => {
    if (Object.keys(errors).length !== 0) {
      toast.error("Veuillez remplir tous les champs obligatoires.", {
        theme: "colored",
      });
    }
  };
  useEffect(() => {
    checkErrorsAndNotify();
  }, [errors]);
  return (
    <div className="registerstep">
      <form
        onSubmit={handleSubmit((data) => {
          dispatch(setCredentials(data));
          setStep((step) => step + 1);
        })}
      >
        <header>S'inscrire</header>
        <h3>Coordonnées</h3>
        <div className="form_input_group">
          <label htmlFor="">Numéro de téléphone</label>
          <input type="text" {...register("BPSNUMTEL")} />
        </div>
        <div className="form_input_group">
          <label htmlFor="">Adresse e-mail</label>
          <input type="text" {...register("BPSADDEML")} />
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
            {...register("BPSPASSE")}
          />
        </div>
        <button>Suivant</button>
      </form>
    </div>
  );
};

export default ContactDetails;
