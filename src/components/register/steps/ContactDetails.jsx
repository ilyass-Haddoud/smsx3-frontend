import { useForm } from "react-hook-form";
import { setCredentials } from "../../../features/register/registerSlice";
import { useDispatch } from "react-redux";

const ContactDetails = ({ step, setStep }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  return (
    <div className="registerstep">
      <form
        onSubmit={handleSubmit((data) => {
          dispatch(setCredentials(data));
          setStep((step) => step + 1);
        })}
      >
        <header>Sign Up</header>
        <h3>Contact Details</h3>
        <div className="form_input_group">
          <label htmlFor="">Numéro de téléphone</label>
          <input type="text" {...register("BPSNUMTEL")} />
        </div>
        <div className="form_input_group">
          <label htmlFor="">Adresse e-mail</label>
          <input type="text" {...register("BPSADDEML")} />
        </div>
        <div className="form_input_group">
          <label htmlFor="">Mot de passe</label>
          <input type="password" {...register("BPSPASSE")} />
        </div>
        <button>Next</button>
      </form>
    </div>
  );
};

export default ContactDetails;
