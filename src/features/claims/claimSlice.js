import { createSlice } from "@reduxjs/toolkit";
import addClaimRequest, { getAllClaimsRequest, getClaimsRequest } from "./claimApi";

const initialState = {
    newClaim: null,
    claims:[],
    isLoading: false,
    errors: null,
};

const ClaimSlice = createSlice({
  name: "claim",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(addClaimRequest.fulfilled, (state, action) => {
      state.errors = null;
      state.isLoading = false;
      state.newClaim = action.payload;
    });
    builder.addCase(addClaimRequest.rejected, (state, action) => {
      state.errors = action.error.message;
      state.isLoading = false;
      state.newClaim = null;
    });
    builder.addCase(addClaimRequest.pending, (state) => {
      state.isLoading = true;
      state.errors = null;
      state.newClaim = null;
    });
    // get claims
    builder.addCase(getClaimsRequest.fulfilled, (state, action) => {
      state.errors = null;
      state.isLoading = false;
      state.claims = action.payload;
    });
    builder.addCase(getClaimsRequest.rejected, (state, action) => {
      state.errors = action.error.message;
      state.isLoading = false;
      state.claims = null;
    });
    builder.addCase(getClaimsRequest.pending, (state) => {
      state.isLoading = true;
      state.errors = null;
      state.claims = null;
    });
    // get all claims
    builder.addCase(getAllClaimsRequest.fulfilled, (state, action) => {
      state.errors = null;
      state.isLoading = false;
      state.claims = action.payload;
    });
    builder.addCase(getAllClaimsRequest.rejected, (state, action) => {
      state.errors = action.error.message;
      state.isLoading = false;
      state.claims = null;
    });
    builder.addCase(getAllClaimsRequest.pending, (state) => {
      state.isLoading = true;
      state.errors = null;
      state.claims = null;
    });
  },
});

export default ClaimSlice.reducer;
