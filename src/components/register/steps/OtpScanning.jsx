import { useDispatch, useSelector } from "react-redux";
import registerRequest from "../../../features/register/registerApi";
import { useNavigate } from "react-router-dom";

const OtpScanning = () => {
  const state = useSelector((state) => state.registerReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  console.log(state);
  return (
    <div className="otpscanning">
      <h2>Scan the code bellow</h2>
      {!state.otpImage && (
        <button
          disabled={state.isLoading}
          onClick={() => dispatch(registerRequest(state.supplier))}
        >
          {state.isLoading ? "Loading" : "Get QR Code"}
        </button>
      )}

      <p>{!state.isLoading && <img src={state.otpImage} />}</p>
      {state.otpImage && (
        <button
          onClick={() => {
            navigate("/auth/login");
          }}
        >
          Done
        </button>
      )}
    </div>
  );
};

export default OtpScanning;
