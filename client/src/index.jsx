import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import './css/App.css'
import './css/index.css'
import './css/keyboard.css'
import './css/numpad.css'

createRoot(document.getElementById("app")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);