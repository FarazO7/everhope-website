import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import { StoreProvider } from "./state/StoreContext.jsx";

// HashRouter (not BrowserRouter) so the static build works on any host and survives a
// hard refresh on a deep link — no server rewrite rules needed for the shareable demo.
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HashRouter>
      <StoreProvider>
        <App />
      </StoreProvider>
    </HashRouter>
  </StrictMode>,
);
