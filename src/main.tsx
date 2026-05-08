import { StrictMode } from "react";
import { hydrateRoot, createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";

const root = document.getElementById("root")!;
const app = (
  <StrictMode>
    <App />
  </StrictMode>
);

// Use hydrateRoot when SSG pre-rendered HTML is present, createRoot as fallback
if (root.hasChildNodes()) {
  hydrateRoot(root, app);
} else {
  createRoot(root).render(app);
}
