import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const getSupplierInfoRequest = createAsyncThunk(
  "loggedSupplier/getSupplierInfoRequest",
  async ({token, decodedToken}) => {
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };
    let url = "http://localhost:8080/suppliers/getInfo/"+decodedToken.email;
    try {
      const res = await axios.get(url, config);
      const data = await res.data;
      return data;
    } catch (error) {
      throw error.response.data;
    }
  }
);


export default getSupplierInfoRequest;
