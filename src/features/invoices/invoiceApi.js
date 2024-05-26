import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";



const addInvoiceRequest = createAsyncThunk(
  "invoice/addInvoiceRequest",
  async ({requestData, token, decodedToken}) => {
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };
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
  "invoice/getInvoicesRequest",
  async ({token, decodedToken}) => {
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };
    let url = "http://localhost:8080/invoices";
    try {
      const res = await axios.get(url, config);
      const data = await res.data;
      return data
    } catch (error) {
      throw error.response.data;
    }
  }
);

export const getInvoiceByIdRequest = createAsyncThunk(
  "invoice/updateInvoiceByIdRequest",
  async ({requestData, token, decodedToken}) => {
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };
    let url = "http://localhost:8080/invoices/id/"+requestData.id;
    try {
      const res = await axios.get(url, config);
      const data = await res.data;
      return data
    } catch (error) {
      throw error.response.data;
    }
  }
);

export const updateInvoiceRequest = createAsyncThunk(
  "invoice/updateInvoiceRequest",
  async ({requestData, token, decodedToken}) => {
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };
    let url = "http://localhost:8080/invoices/"+requestData.id;
    try {
      const res = await axios.put(url, requestData, config);
      const data = await res.data;
      return data
    } catch (error) {
      throw error.response.data;
    }
  }
);

export default addInvoiceRequest;
