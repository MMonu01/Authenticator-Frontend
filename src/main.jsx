import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";

import "./index.css";

import App from "./App.jsx";
import { store, persistor } from "./reducers/store.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId="45415450353-mrg71k2srtqe1ses1nv9ovsbjej7nsd4.apps.googleusercontent.com">
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </GoogleOAuthProvider>
);
