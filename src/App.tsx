import React from "react";
import Header from "view/app-components/Header/Header";
import { Routes, Route } from "react-router-dom";
import MainPage from "view/app-components/MainPage/mainPage";
import LoginPage from "view/app-components/LoginPage/LoginPage";
import PageNotFound from "view/app-components/PageNotFound/pageNotFound";

function App() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="login" element={<LoginPage />} />
                <Route
                    path="registration"
                    element={
                        <>
                            <Header />
                            Registration page
                        </>
                    }
                />
                <Route path="*" element={<PageNotFound />} />
            </Routes>
        </div>
    );
}

export default App;
