import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app/App";
import "./index.css";
import { Provider } from "react-redux";
import store from "./app/store";
import Header from "./components/shared/Header";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <Header />
    <App />
  </Provider>
);
