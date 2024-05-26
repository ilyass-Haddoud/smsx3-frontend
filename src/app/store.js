import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "../features/login/loginSlice";
import registerReducer from "../features/register/registerSlice";
import claimReducer from "../features/claims/claimSlice";
import invoiceReducer from "../features/invoices/invoiceSlice";
import sageInvoiceReducer from "../features/sageInvoices/sageInvoiceSlice";
import supplierReducer from "../features/suppliers/supplierSlice";
import loggedSupplierReducer from "../features/loggedSupplier/loggedSupplierSlice";
import passwordChangeReducer from "../features/passwordChange/passwordChangeSlice";


const store = configureStore({
  reducer: { loginReducer,
            registerReducer,
            claimReducer,
            invoiceReducer,
            sageInvoiceReducer,
            supplierReducer,
            loggedSupplierReducer,
            passwordChangeReducer },
});

export default store;
