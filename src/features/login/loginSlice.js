import { createSlice } from "@reduxjs/toolkit";
import loginRequest from "./loginApi";

const initialState = {
  user: {
    email: "",
    password: "",
    role: "",
  },
  isLoggedIn : localStorage.getItem("token") ? true : false,
  loggedUser: null,
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
      state.user.role = action.payload.role;
    },
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(loginRequest.fulfilled, (state, action) => {
      state.errors = null;
      state.isLoading = false;
      state.token = action.payload;
      state.isLoggedIn = true;
    });
    builder.addCase(loginRequest.rejected, (state, action) => {
      state.errors = action.error.message;
      state.isLoading = false;
      state.token = "";
      state.isLoggedIn = false;
    });
    builder.addCase(loginRequest.pending, (state) => {
      state.isLoading = true;
      state.errors = null;
      state.token = "";
      state.isLoggedIn = false;
    });
  },
});

export const { setCredentials, setIsLoggedIn } = loginSlice.actions;
export default loginSlice.reducer;
