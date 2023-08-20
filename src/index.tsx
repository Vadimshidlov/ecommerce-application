import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "App";
import "commonStyle/styles.scss";
import { AuthStateProvider } from "auth-context";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
    <AuthStateProvider>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </AuthStateProvider>,
);
