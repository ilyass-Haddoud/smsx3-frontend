import { createSlice } from "@reduxjs/toolkit";
import   getSuppliersRequest, { disableSupplier }  from "./supplierApi";

const initialState = {
    suppliers:[],
    isLoading: false,
    errors: null,
};

const SupplierSlice = createSlice({
  name: "supplier",
  initialState,
  extraReducers: (builder)=> {
    // get Suppliers
    builder.addCase(getSuppliersRequest.fulfilled, (state, action) => {
      state.errors = null;
      state.isLoading = false;
      state.suppliers = action.payload;
    });
    builder.addCase(getSuppliersRequest.rejected, (state, action) => {
      state.errors = action.error.message;
      state.isLoading = false;
      state.suppliers = null;
    });
    builder.addCase(getSuppliersRequest.pending, (state) => {
      state.isLoading = true;
      state.errors = null;
      state.suppliers = null;
    });

    // disable Supplier
    builder.addCase(disableSupplier.fulfilled, (state, action) => {
      state.errors = null;
      state.isLoading = false;
      const updatedSupplier = action.payload;
      state.suppliers = state.suppliers.map((supplier) =>
        supplier.bpsaddeml === updatedSupplier.bpsaddeml ? updatedSupplier : supplier
      );
    });
    builder.addCase(disableSupplier.rejected, (state, action) => {
      state.errors = action.error.message;
      state.isLoading = false;
    });
    builder.addCase(disableSupplier.pending, (state) => {
      state.isLoading = true;
      state.errors = null;
    });
  },
});

export default SupplierSlice.reducer;
