import { createBrowserRouter } from "react-router-dom";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import Home from "./pages/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/auth/login",
    element: <Login />,
  },
  {
    path: "/auth/register",
    element: <Register />,
  },
]);

export default router;
