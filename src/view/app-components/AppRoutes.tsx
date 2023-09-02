import React from "react";
import { Routes, Route } from "react-router-dom";
import MainPage from "view/app-components/MainPage/mainPage";
import LoginPage from "view/app-components/LoginPage/LoginPage";
import PageNotFound from "view/app-components/PageNotFound/pageNotFound";
import RegistrationPage from "view/app-components/Registration/components/RegistrationPage";
import ProductPage from "view/app-components/ProductPage/ProductPage";
import { ShopPage } from "view/app-components/ShopPage/ShopPage";

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="shop" element={<ShopPage />} />
            <Route path="registration" element={<RegistrationPage />} />
            <Route path="shop/:productId" element={<ProductPage />} />
            <Route path="*" element={<PageNotFound />} />
        </Routes>
    );
}

export default AppRoutes;
