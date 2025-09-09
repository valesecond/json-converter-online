import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

// Renderiza o App no root
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
