import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../../features/register/registerSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";

const BaseInfo = ({ step, setStep }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
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
        <h3>Informations de base</h3>
        <div>
          <div className="form_input_group">
            <label htmlFor="">Prénom</label>
            <input
              type="text"
              {...register("BPSLNAME", { required: "first name required" })}
            />
          </div>
          <div className="form_input_group">
            <label htmlFor="">Nom</label>
            <input
              type="text"
              {...register("BPSFNAME", { required: "last name required" })}
            />
          </div>
        </div>
        <div>
          <div className="form_input_group">
            <label htmlFor="">Identifiant</label>
            <input
              type="text"
              {...register("BPSNUM", { required: "identifier name required" })}
            />
          </div>
          <div className="form_input_group">
            <label htmlFor="">Raison sociale</label>
            <input
              type="text"
              {...register("BPSNAM", {
                required: "raison sociale required",
              })}
            />
          </div>
        </div>
        <div className="form_input_group">
          <label htmlFor="">Adresse de facturation</label>
          <input
            type="text"
            {...register("BPAINV", { required: "adresse de facturation" })}
          />
        </div>
        <div className="form_input_group">
          <label htmlFor="">Adresse par défaut</label>
          <input
            type="text"
            {...register("BPAADD", { required: "adresse par défaut" })}
          />
        </div>
        <button>Suivant</button>
      </form>
    </div>
  );
};

export default BaseInfo;
