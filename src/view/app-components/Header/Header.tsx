import React from "react";
import { LogoLink } from "view/app-components/Header/LogoLink/LogoLink";
import { CustomerButtons } from "view/app-components/Header/CustomerButtons/CustomerButtons";
import "view/app-components/Header/style.scss";
import { NavLink } from "react-router-dom";
import NavPages from "view/app-components/Header/NavPages/NavPages";

function Header() {
    return (
        <div className="header container">
            <NavLink to="/">
                <LogoLink />
            </NavLink>
            <NavPages />
            <CustomerButtons />
        </div>
    );
}

export default Header;
