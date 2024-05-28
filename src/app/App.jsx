import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Login from "../components/login/Login";
import Register from "../components/register/Register";
import Home from "../pages/Home";
import Header from "../components/shared/Header";
import NotFound from "../pages/NotFound";
import Landing from "../pages/Landing";
import Invoice from "../pages/Invoice";
import ProtectedRoute from "../components/ProtectedRoute";
import Account from "../pages/Account";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";
import {Dashboard} from "../screens/"

const App = () => {
  return (
    <div className="app container">
      <Header />
      <Routes>
        <Route element={<ProtectedRoute/>}>
          <Route element={<Home />} path="/control_panel" />
        </Route>
        <Route element={<Landing />} path="/" />
        <Route element={<Login />} path="auth/login" />
        <Route element={<Register />} path="auth/register" />
        <Route element={<Account />} path="account" />
        <Route element={<Invoice />} path="/invoices/:id" />
        <Route element={<Dashboard />} path="/dashboard" />
        <Route element={<ForgotPassword/>} path="/forgot_password"/>
        <Route element={<ResetPassword/>} path="/reset_password"/>
        <Route element={<NotFound />} path="*" />
      </Routes>
      <ToastContainer />
    </div>
  );
};

export default App;
