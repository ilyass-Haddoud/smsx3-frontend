import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const changePasswordRequest = createAsyncThunk(
  "passwordChange/changePasswordRequest",
  async ({requestData, token, decodedToken}) => {
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };
    let url = "http://localhost:8080/suppliers/change_password";
    let body = {...requestData,email:decodedToken.email}
    try {
      const res = await axios.post(url,body,config);
      const data = await res.data;
      return data;
    } catch (error) {
      throw error.response.data;
    }
  }
);

export default changePasswordRequest;
