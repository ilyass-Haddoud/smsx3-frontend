import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const loginRequest = createAsyncThunk(
  "login/loginRequest",
  async (requestData) => {
    console.log(requestData);
    let url = "";
    let body = null;
    if (requestData.role == "supplier") {
      console.log("its a supplier");
      url =
        "http://localhost:8080/auth/supplier/login?otpCode=" + requestData.otp;
      body = { bpsaddeml: requestData.email, bpspasse: requestData.password };
    } else {
      console.log("its not a supplier");
      url = "http://localhost:8080/auth/login?otpCode=" + requestData.otp;
      body = { email: requestData.email, password: requestData.password };
    }
    try {
      const res = await axios.post(url, body);
      const data = await res.data;
      console.log("DATA", data);
      localStorage.setItem("token", data);
      return data;
    } catch (error) {
      console.log(error.response.data);
      return error.response.data;
    }
  }
);

export default loginRequest;
