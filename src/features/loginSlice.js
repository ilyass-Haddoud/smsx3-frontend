import { createSlice } from "@reduxjs/toolkit";
import loginRequest from "./loginApi";

const initialState = {
  user: {
    email: "",
    password: "",
    otp: "",
  },
  isLoading: false,
  errors: null,
  token: "",
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.user.email = action.payload.email;
      state.user.password = action.payload.password;
    },

    setOtp: (state, action) => {
      state.user.otp = action.payload.otp;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginRequest.fulfilled, (state, action) => {
      state.errors = null;
      state.isLoading = false;
      state.token = action.payload;
    });
    builder.addCase(loginRequest.rejected, (state, action) => {
      state.errors = action.error.message;
      state.isLoading = false;
      state.token = "";
    });
    builder.addCase(loginRequest.pending, (state) => {
      state.isLoading = true;
      state.errors = null;
      state.token = "";
    });
  },
});

export const { setCredentials, setOtp } = loginSlice.actions;
export default loginSlice.reducer;
