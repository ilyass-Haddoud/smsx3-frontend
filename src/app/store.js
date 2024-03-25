import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "../features/login/loginSlice";
import registerReducer from "../features/register/registerSlice";

const store = configureStore({
  reducer: { loginReducer, registerReducer },
});

export default store;
