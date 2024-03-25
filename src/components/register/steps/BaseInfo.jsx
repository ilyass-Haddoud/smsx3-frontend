import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../../features/register/registerSlice";

const BaseInfo = ({ step, setStep }) => {
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
        <h3>Base Information </h3>
        <div>
          <div className="form_input_group">
            <label htmlFor="">First name</label>
            <input type="text" {...register("BPSLNAME")} />
          </div>
          <div className="form_input_group">
            <label htmlFor="">Last name</label>
            <input type="text" {...register("BPSFNAME")} />
          </div>
        </div>
        <div>
          <div className="form_input_group">
            <label htmlFor="">Identifier</label>
            <input type="text" {...register("BPSNUM")} />
          </div>
          <div className="form_input_group">
            <label htmlFor="">Raison sociale</label>
            <input type="text" {...register("BPSNAM")} />
          </div>
        </div>
        <div className="form_input_group">
          <label htmlFor="">Adresse de facturation</label>
          <input type="text" {...register("BPAINV")} />
        </div>
        <div className="form_input_group">
          <label htmlFor="">Adresse par défaut</label>
          <input type="text" {...register("BPAADD")} />
        </div>
        <button>Next</button>
      </form>
    </div>
  );
};

export default BaseInfo;
