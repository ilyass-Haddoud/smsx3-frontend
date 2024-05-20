import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";



const getSuppliersRequest = createAsyncThunk(
  "supplier/getSuppliers",
  async ({token, decodedToken}) => {
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };
    let url = "http://localhost:8080/suppliers";
    try {
      const res = await axios.get(url, config);
      const data = await res.data;
      return data
    } catch (error) {
      throw error.response.data;
    }
  }
);

export const disableSupplier = createAsyncThunk(
  "supplier/disableSupplier",
  async ({requestData, token, decodedToken}) => {
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };
    let url = "http://localhost:8080/suppliers/disable";
    let body = {"bpsaddeml":requestData[0].bpsaddeml,"disactivated":requestData[0].disactivated}
    try {
      const res = await axios.post(url, body, config);
      const data = await res.data;
      return data
    } catch (error) {
      throw error.response.data;
    }
  }
);

export default getSuppliersRequest;
