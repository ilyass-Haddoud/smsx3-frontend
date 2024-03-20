import { useState } from "react";
import OTPInput from "react-otp-input";
import "./otp.css";

const Otp = () => {
  const [otp, setOtp] = useState("");
  return (
    <div className="otp">
      <form>
        <header>Verification code</header>
        <OTPInput
          inputStyle={{
            width: 50,
            heigth: 50,
            padding: "10px",
            border: "1px #666666 solid",
            borderRadius: "5px",
            fontSize: "medium",
          }}
          value={otp}
          onChange={setOtp}
          shouldAutoFocus={true}
          numInputs={6}
          renderSeparator={<span>-</span>}
          renderInput={(props) => <input {...props} />}
        />
      </form>
    </div>
  );
};

export default Otp;
