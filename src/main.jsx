import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./app/store";

import MyProvider from "./components/profile-screens/hooks/useContext.jsx";
// import initAxios from "./api/config.js";

// initAxios()

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <MyProvider>
        <App />
      </MyProvider>
    </Provider>
  </React.StrictMode>
);
