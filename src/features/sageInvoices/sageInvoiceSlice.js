import { createSlice } from "@reduxjs/toolkit";
import { addInvoiceToSageRequest, getInvoicesFromSageRequest } from "./sageInvoiceApi";

const initialState = {
  invoices: [],
  isLoading: false,
  errors: null,
  added: false,
  adding:false
};

const InvoiceSlice = createSlice({
  name: "sageInvoice",
  initialState,
  extraReducers: (builder)=> {
    // get invoices from sage
    builder.addCase(getInvoicesFromSageRequest.fulfilled, (state, action) => {
      state.errors = null;
      state.isLoading = false;
      state.invoices = action.payload;
    });
    builder.addCase(getInvoicesFromSageRequest.rejected, (state, action) => {
      state.errors = action.error.message;
      state.isLoadingFromSage = false;
      state.invoices = [];
    });
    builder.addCase(getInvoicesFromSageRequest.pending, (state) => {
      state.isLoadingFromSage = true;
      state.errors = null;
      state.invoices = [];
    });
    // add invoice to sage
    builder.addCase(addInvoiceToSageRequest.fulfilled, (state, action) => {
      state.errors = null;
      state.adding = false;
      state.added = true;
    });
    builder.addCase(addInvoiceToSageRequest.rejected, (state, action) => {
      state.errors = action.error.message;
      state.adding = false;
      state.added = false;

    });
    builder.addCase(addInvoiceToSageRequest.pending, (state) => {
      state.adding = true;
      state.errors = null;
      state.added = false;
    });
  },
});

export default InvoiceSlice.reducer;
