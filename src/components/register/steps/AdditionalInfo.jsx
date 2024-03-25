import { useForm } from "react-hook-form";
import { setCredentials } from "../../../features/register/registerSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const AdditionalInfo = ({ step, setStep }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="registerstep">
      <form
        onSubmit={handleSubmit((data) => {
          dispatch(setCredentials(data));
          setStep((step) => step + 1);
        })}
      >
        <header>Sign Up</header>
        <h3>Additional Information</h3>
        <div>
          <div className="form_input_group">
            <label htmlFor="">Fournisseur groupe</label>
            <input type="text" {...register("BPSGRU")} />
          </div>
          <div className="form_input_group">
            <label htmlFor="">Tiers risque</label>
            <input type="text" {...register("BPSRSK")} />
          </div>
        </div>
        <div>
          <div className="form_input_group">
            <label htmlFor="">Catégorie</label>
            <input type="text" {...register("BSGCOD")} />
          </div>
          <div className="form_input_group">
            <label htmlFor="">Transporteur</label>
            <input type="text" {...register("BPTNUM")} />
          </div>
        </div>
        <div>
          <div className="form_input_group">
            <label htmlFor="">Numéro du client/fournisseur</label>
            <input type="text" {...register("BPSNUMBPS")} />
          </div>
          <div className="form_input_group">
            <label htmlFor="">Type de fournisseur</label>
            <input type="text" {...register("BPSTYP")} />
          </div>
        </div>
        <div className="form_input_group">
          <label htmlFor="">Observations</label>
          <input type="text" {...register("BPSREM")} />
        </div>
        <button>Submit</button>
      </form>
    </div>
  );
};

export default AdditionalInfo;
