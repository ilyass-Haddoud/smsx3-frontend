import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const loginRequest = createAsyncThunk(
  "login/loginRequest",
  async (requestData) => {
    try {
      const res = await axios.post(
        "http://localhost:8080/auth/login?otpCode=" + requestData.otp,
        { email: requestData.email, password: requestData.password }
      );
      const data = await res.data;
      localStorage.setItem("token", data);
      return data;
    } catch (error) {
      console.log(error.response.data);
      throw error.response.data;
    }
  }
);

export default loginRequest;
