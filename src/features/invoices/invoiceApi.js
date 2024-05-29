import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";



const addInvoiceRequest = createAsyncThunk(
  "invoice/addInvoiceRequest",
  async ({requestData, file, token, decodedToken}) => {
    const body = new FormData();
    body.append("test","ilyass")
    body.append("file", file)
    body.append("invoice",JSON.stringify(requestData))
    console.log(...body);
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      }
    };
    let url = "http://localhost:8080/invoices/"+decodedToken.id+"/addInvoice";
    try {
      const res = await axios.post(url, body, config);
      const data = await res.data;
      return data;
    } catch (error) {
      throw error.response.data;
    }
  }
);

export const getAllInvoicesRequest = createAsyncThunk(
  "invoice/getAllInvoicesRequest",
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
  "invoice/getInvoiceByIdRequest",
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

export const getInvoiceBySupplierIdRequest = createAsyncThunk(
  "invoice/getInvoiceBySupplierIdRequest",
  async ({token, decodedToken}) => {
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };
    let url = "http://localhost:8080/invoices/"+decodedToken.id;
    try {
      const res = await axios.get(url, config);
      const data = await res.data;
      console.log(data);
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
