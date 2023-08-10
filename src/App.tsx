import React from "react";
import Header from "view/app-components/Header/Header";
import { Routes, Route } from "react-router-dom";

function App() {
    return (
        <div>
            <Header />
            <Routes>
                <Route path="/" element={<Header />} />
                <Route path="about" element={<Header />} />
                <Route path="contact" element={<Header />} />
            </Routes>
            <h1>Hello,React!!!!</h1>
        </div>
    );
}

export default App;
