import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Login from "../components/login/Login";
import Register from "../components/register/Register";
import Home from "../pages/Home";
import Header from "../components/shared/Header";

const App = () => {
  return (
    <div className="app container">
      <Header />
      <Routes>
        <Route element={<Home />} path="/" />
        <Route element={<Login />} path="auth/login" />
        <Route element={<Register />} path="auth/register" />
      </Routes>
      <ToastContainer />
    </div>
  );
};

export default App;
