import { createSlice } from "@reduxjs/toolkit";
import registerRequest from "./registerApi";

const initialState = {
  supplier: {
    BPSLNAME: "",
    BPSFNAME: "",
    BPSNUM: "",
    BPSNAM: "",
    BPAINV: "",
    BPAADD: "",
    BPSNUMTEL: "",
    BPSADDEML: "",
    BPSPASSE: "",
    BPSREM: "",
    BPSGRU: "",
    BPSRSK: "",
    BSGCOD: "",
    BPTNUM: "",
    BPSNUMBPS: "",
    BPSTYP: "",
  },
  isLoading: false,
  errors: null,
};

const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.supplier = { ...state.supplier, ...action.payload };
    },
    extraReducers: (builder) => {
      builder.addCase(registerRequest.fulfilled, (state, action) => {
        state.errors = null;
        state.isLoading = false;
        state.token = action.payload;
      });
      builder.addCase(registerRequest.rejected, (state, action) => {
        state.errors = action.error.message;
        state.isLoading = false;
        state.token = "";
      });
      builder.addCase(registerRequest.pending, (state) => {
        state.isLoading = true;
        state.errors = null;
        state.token = "";
      });
    },
  },
});

export const { setCredentials } = registerSlice.actions;
export default registerSlice.reducer;
