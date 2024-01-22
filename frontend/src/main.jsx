import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

import { AuthProvider } from "./context/AuthProvider.jsx";
import { CartProvider } from "./context/CartContext.jsx";
import "./index.scss";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </AuthProvider>
  </React.StrictMode>
);
