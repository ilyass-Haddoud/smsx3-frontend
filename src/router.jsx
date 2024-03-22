import { createBrowserRouter } from "react-router-dom";
import Login from "./components/login/Login";

const router = createBrowserRouter([
  {
    path: "/auth/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <div>Hello World!</div>,
  },
]);

export default router;
