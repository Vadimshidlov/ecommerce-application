import React from "react";
import { LogoLink } from "view/app-components/Header/LogoLink/LogoLink";
import { CustomerButtons } from "view/app-components/Header/CustomerButtons/CustomerButtons";
import "view/app-components/Header/style.scss";
import { NavLink } from "react-router-dom";

function Header() {
    return (
        <div className="header">
            <NavLink to="/">
                <LogoLink />
            </NavLink>
            <CustomerButtons />
        </div>
    );
}

export default Header;
