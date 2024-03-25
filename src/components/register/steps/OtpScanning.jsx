import { useDispatch, useSelector } from "react-redux";
import registerRequest from "../../../features/register/registerApi";

const OtpScanning = () => {
  const state = useSelector((state) => state.registerReducer);
  const dispatch = useDispatch();
  console.log(state);
  return (
    <div className="otpscanning">
      <h1>Scan the fucking code bellow</h1>
      <button onClick={() => dispatch(registerRequest(state.supplier))}>
        sign in
      </button>
      <p>{state.isLoading && "Loading"}</p>
      <p>{!state.isLoading && <img src={state.otpImage} />}</p>
    </div>
  );
};

export default OtpScanning;
