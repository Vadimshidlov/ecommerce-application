import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "App";
import "commonStyle/styles.scss";
import { AuthStateProvider } from "auth-context";
// import { FilterProvider } from "providers/FilterProvider";
import { BasketProvider } from "providers/BasketItemsProvider";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
    <AuthStateProvider>
        <BasketProvider>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </BasketProvider>
    </AuthStateProvider>,
);
