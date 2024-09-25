import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import router from "./router.jsx";
import "./index.css";
import "./normalize.css";
import "./all.min.css";
import { RouterProvider } from "react-router-dom";
import { ContextProvider } from "./contexts/ContextProvider.jsx";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <ContextProvider>
            <RouterProvider router={router} />
        </ContextProvider>
    </StrictMode>
);
