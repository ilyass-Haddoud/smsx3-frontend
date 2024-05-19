import { createSlice } from "@reduxjs/toolkit";
import changePasswordRequest from "./passwordChangeApi";

const initialState = {
    success: null,
    isLoading: false,
    errors: null,
};

const PasswordChangeSlice = createSlice({
  name: "passwordChange",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(changePasswordRequest.fulfilled, (state, action) => {
      state.errors = null;
      state.isLoading = false;
      state.success = action.payload;
    });
    builder.addCase(changePasswordRequest.rejected, (state, action) => {
      state.errors = action.error.message;
      state.isLoading = false;
      state.success = false;
    });
    builder.addCase(changePasswordRequest.pending, (state) => {
      state.errors = null;
      state.isLoading = true;
      state.success = null;
    });
  },
});

export default PasswordChangeSlice.reducer;
