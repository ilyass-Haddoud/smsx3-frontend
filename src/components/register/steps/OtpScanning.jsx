import { useDispatch, useSelector } from "react-redux";
import registerRequest from "../../../features/register/registerApi";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "react-toastify";

const OtpScanning = () => {
  const state = useSelector((state) => state.registerReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const checkErrorsAndNotify = () => {
    if (state.errors !== 0) {
      toast.error(state.errors, {
        theme: "colored",
      });
    }
  };
  useEffect(() => {
    checkErrorsAndNotify();
  }, [state.errors]);
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
