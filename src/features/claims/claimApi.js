import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";




const addClaimRequest = createAsyncThunk(
  "claim/addClaim",
  async ({requestData, token, decodedToken}) => {
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };
    let url = "http://localhost:8080/claims/"+decodedToken.id+"/addClaim";
    let body = requestData;
    try {
      const res = await axios.post(url, body,config);
      const data = await res.data;
      return data;
    } catch (error) {
      throw error.response.data;
    }
  }
);


export const getClaimsRequest = createAsyncThunk(
  "claim/getClaims",
  async ({token, decodedToken}) => {
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };
    let url = "http://localhost:8080/claims/"+decodedToken.id+"/getClaims";
    try {
      const res = await axios.post(url, config);
      const data = await res.data;
      return data;
    } catch (error) {
      throw error.response.data;
    }
  }
);

export const getAllClaimsRequest = createAsyncThunk(
  "claim/getAllClaims",
  async ({token, decodedToken}) => {
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };
    let url = "http://localhost:8080/claims";
    try {
      const res = await axios.get(url,config);
      const data = await res.data;
      return data;
    } catch (error) {
      throw error.response.data;
    }
  }
);

export default addClaimRequest;
