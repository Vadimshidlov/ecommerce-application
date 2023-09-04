import React from "react";
import { Routes, Route } from "react-router-dom";
import MainPage from "view/app-components/MainPage/mainPage";
import LoginPage from "view/app-components/LoginPage/LoginPage";
import PageNotFound from "view/app-components/PageNotFound/pageNotFound";
import RegistrationPage from "view/app-components/Registration/components/RegistrationPage";
import ProductPage from "view/app-components/ProductPage/ProductPage";
import { ShopPage } from "view/app-components/ShopPage/ShopPage";
import { CategoryPage } from "view/app-components/ShopPage/CategoryPage/CategoryPage";

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="registration" element={<RegistrationPage />} />
            <Route path="shop" element={<ShopPage />} />
            <Route path="shop/:categoryKey/:productId" element={<ProductPage />} />
            <Route path="shop/:categoryKey" element={<CategoryPage />} />
            <Route path="shop/product/:productId" element={<ProductPage />} />
            <Route path="*" element={<PageNotFound />} />
        </Routes>
    );
}

export default AppRoutes;
