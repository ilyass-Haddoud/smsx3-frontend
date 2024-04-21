import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "../features/login/loginSlice";
import registerReducer from "../features/register/registerSlice";
import claimReducer from "../features/claims/claimSlice";
import invoiceReducer from "../features/invoices/invoiceSlice";

const store = configureStore({
  reducer: { loginReducer, registerReducer, claimReducer, invoiceReducer },
});

export default store;
