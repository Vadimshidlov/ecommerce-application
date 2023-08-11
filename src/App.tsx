import React from "react";
import Header from "view/app-components/Header/Header";
import { Routes, Route } from "react-router-dom";
import MainPage from "view/app-components/MainPage/mainPage";
import Text from "view/app-components/Text/text";


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

            <MainPage />

            <h1>Hello,React!!!!</h1>
            <Text classes={["example", "dark", "ff-primary", "fz-5rem", "fw-500"]}>
                text with classes
            </Text>
        </div>
    );
}

export default App;
