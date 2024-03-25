import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const registerRequest = createAsyncThunk(
  "register/registerRequest",
  async (requestData) => {
    const lowercaseRequestData = Object.keys(requestData).reduce((acc, key) => {
      acc[key.toLowerCase()] = requestData[key];
      return acc;
    }, {});
    console.log("####lowercaseRequestData####", lowercaseRequestData);
    try {
      const res = await axios.post(
        "http://localhost:8080/auth/supplier/register",
        lowercaseRequestData
      );
      const data = await res.data;
      console.log("##############DATA################", data);
      return data;
    } catch (error) {
      throw error.response.data;
    }
  }
);

export default registerRequest;
