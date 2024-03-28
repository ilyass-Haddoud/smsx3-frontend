import { useDispatch, useSelector } from "react-redux";
import registerRequest from "../../../features/register/registerApi";
import { useNavigate } from "react-router-dom";

const OtpScanning = () => {
  const state = useSelector((state) => state.registerReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <div className="otpscanning">
      {!state.otpImage && <h2>Générer le Code QR de Connexion</h2>}
      {state.otpImage && <h2>Scanner le code ci-dessous</h2>}
      {!state.otpImage && (
        <button
          disabled={state.isLoading}
          onClick={() => dispatch(registerRequest(state.supplier))}
        >
          {state.isLoading ? "Chargement" : "Générer le QR Code"}
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
