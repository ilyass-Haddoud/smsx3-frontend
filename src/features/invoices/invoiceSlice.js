import { createSlice } from "@reduxjs/toolkit";
import addInvoiceRequest, { getInvoiceByIdRequest, getInvoiceBySupplierIdRequest, getAllInvoicesRequest, updateInvoiceRequest } from "./invoiceApi";


const initialState = {
    newInvoice: null,
    invoiceToUpdate: null,
    invoices:[],
    isLoading: false,
    errors: null,
};

const InvoiceSlice = createSlice({
  name: "invoice",
  initialState,
  reducers:{
    addInvoice:(state, action)=>{
      state.newInvoice = action.payload;
    }
  },
  extraReducers: (builder)=> {

    //add invoice
    builder.addCase(addInvoiceRequest.fulfilled, (state, action) => {
      state.errors = null;
      state.isLoading = false;
      state.invoices.push(action.payload);
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
    builder.addCase(getAllInvoicesRequest.fulfilled, (state, action) => {
      state.errors = null;
      state.isLoading = false;
      state.invoices = action.payload;
    });
    builder.addCase(getAllInvoicesRequest.rejected, (state, action) => {
      state.errors = action.error.message;
      state.isLoading = false;
      state.invoices = [];
    });
    builder.addCase(getAllInvoicesRequest.pending, (state) => {
      state.isLoading = true;
      state.errors = null;
      state.invoices = [];
    });

    // get invoice by id
    builder.addCase(getInvoiceByIdRequest.fulfilled, (state, action) => {
      state.errors = null;
      state.isLoading = false;
      state.invoiceToUpdate = action.payload;
    });
    builder.addCase(getInvoiceByIdRequest.rejected, (state, action) => {
      state.errors = action.error.message;
      state.isLoading = false;
      state.invoiceToUpdate = null;
    });
    builder.addCase(getInvoiceByIdRequest.pending, (state) => {
      state.isLoading = true;
      state.errors = null;
      state.invoiceToUpdate = null;
    });

    // get invoice by supplier id
    builder.addCase(getInvoiceBySupplierIdRequest.fulfilled, (state, action) => {
      state.errors = null;
      state.isLoading = false;
      state.invoices = action.payload;
    });
    builder.addCase(getInvoiceBySupplierIdRequest.rejected, (state, action) => {
      state.errors = action.error.message;
      state.isLoading = false;
      state.invoices = null;
    });
    builder.addCase(getInvoiceBySupplierIdRequest.pending, (state) => {
      state.isLoading = true;
      state.errors = null;
      state.invoices = null;
    });

    // update invoices
    builder.addCase(updateInvoiceRequest.fulfilled, (state, action) => {
      state.errors = null;
      state.isLoading = false;
      state.invoices = state.invoices.map(invoice => {
        if (invoice.id === action.payload.id) {
          return action.payload;
        } else {
          return invoice;
        }
      });
    });
    builder.addCase(updateInvoiceRequest.rejected, (state, action) => {
      state.errors = action.error.message;
      state.isLoading = false;
    });
    builder.addCase(updateInvoiceRequest.pending, (state) => {
      state.isLoading = true;
      state.errors = null;
    });
  },
});

export const { addInvoice } = InvoiceSlice.actions;
export default InvoiceSlice.reducer;
