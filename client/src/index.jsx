import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import './css/App.css'
import './css/keyboard.css'
import './css/numpad.css'
import './css/profil.css'
import './css/description.css'
import './css/contact.css'
import './css/formkeyboard.css'

createRoot(document.getElementById("app")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);