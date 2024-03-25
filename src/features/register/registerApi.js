import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const registerRequest = createAsyncThunk(
  "register/registerRequest",
  async (requestData) => {
    try {
      const res = await axios.post(
        "http://localhost:8080/auth/supplier/register",
        requestData
      );
      const data = await res.data;
      return data;
    } catch (error) {
      console.log(error.response.data);
      throw error.response.data;
    }
  }
);

export default registerRequest;
