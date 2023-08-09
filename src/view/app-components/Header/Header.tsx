import React from "react";
import { LogoLink } from "view/app-components/Header/LogoLink/LogoLink";
import { CustomerButtons } from "view/app-components/Header/CustomerButtons/CustomerButtons";
import "view/app-components/Header/style.scss";

function Header() {
    return (
        <div className="header">
            <LogoLink />
            <CustomerButtons />
        </div>
    );
}

export default Header;
