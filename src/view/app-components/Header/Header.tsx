import React, { useState } from "react";
import { LogoLink } from "view/app-components/Header/LogoLink/LogoLink";
import { CustomerButtons } from "view/app-components/Header/CustomerButtons/CustomerButtons";
import "view/app-components/Header/style.scss";
import { NavLink } from "react-router-dom";
import NavPages from "view/app-components/Header/NavPages/NavPages";
import { ButtonIcon } from "shared/components/ButtonIcon/ButtonIcon";
import burger from "assets/svg/Hamburger.svg";

function Header() {
    const [activeButton, setActiveButton] = useState(false);

    return (
        <div className="header container">
            <NavLink className="header__logo" to="/">
                <LogoLink />
            </NavLink>
            <NavPages activeButton={activeButton} setActiveButton={setActiveButton} />
            <div className="header__burger-wrapper">
                <CustomerButtons />
                <ButtonIcon
                    url={burger}
                    altText="burger-menu-icon"
                    classes="header__burger-button"
                    onClick={() => {
                        setActiveButton(!activeButton);
                    }}
                />
            </div>
        </div>
    );
}

export default Header;
