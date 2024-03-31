import { RouterProvider } from "react-router-dom";
import router from "../router";
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <div className="app container">
      <RouterProvider router={router} />
      <ToastContainer />
    </div>
  );
};

export default App;
