import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../../features/register/registerSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { baseInfoSchema } from "../registerValidation";

const BaseInfo = ({ step, setStep }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(baseInfoSchema) });
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
        <div className="input_grp">
          <div className="form_input_group">
            <label htmlFor="">Prénom <span style={{color:'red'}}>*</span></label>
            <input type="text" {...register("BPSLNAME")} />
          </div>
          <div className="form_input_group">
            <label htmlFor="">Nom <span style={{color:'red'}}>*</span></label>
            <input type="text" {...register("BPSFNAME")} />
          </div>
        </div>
        <div className="input_grp">
          <div className="form_input_group">
            <label htmlFor="">Identifiant <span style={{color:'red'}}>*</span></label>
            <input type="text" {...register("BPSNUM")} />
          </div>
          <div className="form_input_group">
            <label htmlFor="">Raison sociale <span style={{color:'red'}}>*</span></label>
            <input type="text" {...register("BPSNAM")} />
          </div>
        </div>
        <div className="form_input_group">
          <label htmlFor="">Adresse de facturation <span style={{color:'red'}}>*</span></label>
          <input type="text" {...register("BPAINV")} />
        </div>
        <div className="form_input_group">
          <label htmlFor="">Adresse par défaut <span style={{color:'red'}}>*</span></label>
          <input type="text" {...register("BPAADD")} />
        </div>
        <button>Suivant</button>
      </form>
    </div>
  );
};

export default BaseInfo;
