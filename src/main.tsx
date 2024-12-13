import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

// Find the root element in your HTML
const container = document.getElementById("root");

// Ensure the container exists and create a root
if (container) {
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
