import React from "react";
import Header from "view/app-components/Header/Header";
import { Routes, Route } from "react-router-dom";

function App() {
    return (
        <div>
            {/* <Header /> */}
            <Routes>
                <Route
                    path="/"
                    element={
                        <>
                            <Header />
                            Main page
                        </>
                    }
                />
                <Route
                    path="login"
                    element={
                        <>
                            <Header />
                            Login page
                        </>
                    }
                />
                <Route
                    path="registration"
                    element={
                        <>
                            <Header />
                            Registration page
                        </>
                    }
                />
            </Routes>
            <h1>Hello,React!!!!</h1>
        </div>
    );
}

export default App;
