import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "App";
import "commonStyle/styles.scss";
import { AuthStateProvider } from "auth-context";
import { FilterProvider } from "providers/FilterProvider";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
    <AuthStateProvider>
        <FilterProvider>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </FilterProvider>
    </AuthStateProvider>,
);
