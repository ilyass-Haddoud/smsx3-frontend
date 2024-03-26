import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../../features/register/registerSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BaseInfo = ({ step, setStep }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();

  const checkErrorsAndNotify = () => {
    if (Object.keys(errors).length !== 0) {
      toast.error("Please fill in all required fields.", {
        theme: "colored",
      });
    }
  };

  checkErrorsAndNotify();

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
            <input
              type="text"
              {...register("BPSLNAME", { required: "first name required" })}
            />
          </div>
          <div className="form_input_group">
            <label htmlFor="">Last name</label>
            <input
              type="text"
              {...register("BPSFNAME", { required: "last name required" })}
            />
          </div>
        </div>
        <div>
          <div className="form_input_group">
            <label htmlFor="">Identifier</label>
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
                required: "raison sociale name required",
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
        <button>Next</button>
      </form>
    </div>
  );
};

export default BaseInfo;
