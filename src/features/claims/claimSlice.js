import { createSlice } from "@reduxjs/toolkit";
import addClaimRequest from "./claimApi";

const initialState = {
    claims: null,
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
      state.claims = action.payload;
    });
    builder.addCase(addClaimRequest.rejected, (state, action) => {
      state.errors = action.error.message;
      state.isLoading = false;
      state.claims = null;
    });
    builder.addCase(addClaimRequest.pending, (state) => {
      state.isLoading = true;
      state.errors = null;
      state.claims = null;
    });
  },
});

export const { setClaims } = ClaimSlice.actions;
export default ClaimSlice.reducer;
