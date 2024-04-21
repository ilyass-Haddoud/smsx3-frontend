import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import useJwt from  "../../hooks/useJwt"

const {token,decodedToken} = useJwt();

const config = {
  headers: { Authorization: `Bearer ${token}` }
};

const addInvoiceRequest = createAsyncThunk(
  "invoice/addInvoice",
  async (requestData) => {
      let url = "http://localhost:8080/invoices/"+decodedToken.id+"/addInvoice";
      let body = requestData;
    try {
      const res = await axios.post(url, body, config);
      const data = await res.data;
      return data;
    } catch (error) {
      throw error.response.data;
    }
  }
);


export const getInvoicesRequest = createAsyncThunk(
  "invoice/getInvoices",
  async (requestData) => {
      let url = "http://localhost:8080/invoices/"+decodedToken.id+"/getInvoices";
      let body = requestData;
    try {
      const res = await axios.post(url, body, config);
      const data = await res.data;
      return data;
    } catch (error) {
      throw error.response.data;
    }
  }
);

export default addInvoiceRequest;
