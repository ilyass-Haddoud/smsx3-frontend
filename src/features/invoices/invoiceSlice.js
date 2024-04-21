import { createSlice } from "@reduxjs/toolkit";
import addInvoiceRequest, { getInvoicesRequest } from "./invoiceApi";

const initialState = {
    newInvoice: null,
    invoices:[],
    isLoading: false,
    errors: null,
};

const InvoiceSlice = createSlice({
  name: "invoice",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(addInvoiceRequest.fulfilled, (state, action) => {
      state.errors = null;
      state.isLoading = false;
      state.newInvoice = action.payload;
    });
    builder.addCase(addInvoiceRequest.rejected, (state, action) => {
      state.errors = action.error.message;
      state.isLoading = false;
      state.newInvoice = null;
    });
    builder.addCase(addInvoiceRequest.pending, (state) => {
      state.isLoading = true;
      state.errors = null;
      state.newInvoice = null;
    });
    // get invoices
    builder.addCase(getInvoicesRequest.fulfilled, (state, action) => {
      state.errors = null;
      state.isLoading = false;
      state.invoices = action.payload;
    });
    builder.addCase(getInvoicesRequest.rejected, (state, action) => {
      state.errors = action.error.message;
      state.isLoading = false;
      state.invoices = null;
    });
    builder.addCase(getInvoicesRequest.pending, (state) => {
      state.isLoading = true;
      state.errors = null;
      state.invoices = null;
    });
  },
});

export const { setClaims } = InvoiceSlice.actions;
export default InvoiceSlice.reducer;
