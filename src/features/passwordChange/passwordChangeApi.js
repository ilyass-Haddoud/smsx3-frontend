import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import useJwt from  "../../hooks/useJwt"

const {token,decodedToken} = useJwt();

const config = {
  headers: { Authorization: `Bearer ${token}` }
};

const changePasswordRequest = createAsyncThunk(
  "passwordChange/changePasswordRequest",
  async (RequestData) => {
      let url = "http://localhost:8080/suppliers/change_password";
      let body = {...RequestData,email:decodedToken.email}
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
