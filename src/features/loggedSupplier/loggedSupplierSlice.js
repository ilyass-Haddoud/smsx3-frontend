import { createSlice } from "@reduxjs/toolkit";
import getSupplierInfoRequest from "./loggedSupplierApi";

const initialState = {
    loggedUser:null,
    isLoading: false,
    errors: null,
};

const loggedSupplierSlice = createSlice({
  name: "loggedSupplier",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getSupplierInfoRequest.fulfilled, (state, action) => {
      state.errors = null;
      state.isLoading = false;
      state.loggedUser = action.payload;
    });
    builder.addCase(getSupplierInfoRequest.rejected, (state, action) => {
      state.errors = action.error.message;
      state.isLoading = false;
      state.newClaim = null;
    });
    builder.addCase(getSupplierInfoRequest.pending, (state) => {
      state.isLoading = true;
      state.errors = null;
      state.newClaim = null;
    });
  },
});

export default loggedSupplierSlice.reducer;
