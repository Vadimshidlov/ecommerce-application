import React from "react";
import { LogoLink } from "view/app-components/Header/LogoLink/LogoLink";
import { CustomerButtons } from "view/app-components/Header/CustomerButtons/CustomerButtons";
import "view/app-components/Header/style.scss";
import { NavLink, useLocation } from "react-router-dom";
import NavPages from "view/app-components/Header/NavPages/NavPages";

function Header() {
    const location = useLocation();
    const isOverlay = location.pathname === "/";
    return (
        <div className={isOverlay ? "header-overlay container" : "header container"}>
            <NavLink to="/">
                <LogoLink />
            </NavLink>
            <NavPages />
            <CustomerButtons />
        </div>
    );
}

export default Header;
