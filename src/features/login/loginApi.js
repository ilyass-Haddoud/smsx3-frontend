import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const loginRequest = createAsyncThunk(
  "login/loginRequest",
  async (requestData) => {
    let url = "";
    let body = null;
    if (requestData.role == "fournisseur") {
      url =
        "http://localhost:8080/auth/supplier/login?otpCode=" + requestData.otp;
      body = { bpsaddeml: requestData.email, bpspasse: requestData.password };
    } else {
      url = "http://localhost:8080/auth/login";
      body = { email: requestData.email, password: requestData.password };
    }
    try {
      const res = await axios.post(url, body);
      const data = await res.data;
      localStorage.setItem("token", data);
      return data;
    } catch (error) {
      throw error.response.data;
    }
  }
);

export default loginRequest;
