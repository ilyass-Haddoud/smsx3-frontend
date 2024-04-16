import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "../features/login/loginSlice";
import registerReducer from "../features/register/registerSlice";
import claimReducer from "../features/claims/claimSlice";

const store = configureStore({
  reducer: { loginReducer, registerReducer, claimReducer },
});

export default store;
