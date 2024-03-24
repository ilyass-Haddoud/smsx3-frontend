import { createBrowserRouter } from "react-router-dom";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Hello World!</div>,
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
