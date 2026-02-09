import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import App from "./App";
import { AuthProvider } from "./auth/AuthContext";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <App />
        <Toaster
          position="bottom-center"
          toastOptions={{
            style: { background: "#111", color: "#fff" },
            success: { style: { background: "#22c55e", color: "#000" } },
            error: { style: { background: "#ef4444", color: "#fff" } },
          }}
        />
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);