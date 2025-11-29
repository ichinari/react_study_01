import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import LoadingProvider from "./context/LoadingContext.jsx";
import App from "./page/App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <LoadingProvider>
        <App />
      </LoadingProvider>
    </BrowserRouter>
  </StrictMode>
);
