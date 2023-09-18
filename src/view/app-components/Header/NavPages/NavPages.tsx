import React from "react";
import { NavLink } from "react-router-dom";
import { ButtonIcon } from "shared/components/ButtonIcon/ButtonIcon";
import close from "assets/svg/close.svg";
import { LogoLink } from "view/app-components/Header/LogoLink/LogoLink";

type NavPagesType = {
    activeButton: boolean;
    setActiveButton: (value: React.SetStateAction<boolean>) => void;
};

export default function NavPages({ activeButton, setActiveButton }: NavPagesType) {
    const { body } = document;
    body.style.overflowY = activeButton ? "hidden" : "auto";

    return (
        <>
            {activeButton && (
                <div
                    className="filter__blur-bg"
                    onClick={() => {
                        setActiveButton(!activeButton);
                    }}
                    onKeyDown={() => {}}
                />
            )}
            <nav className={`navigation-links ${activeButton ? "navigation-links_active" : ""}`}>
                {activeButton && (
                    <div className="burger-menu__header">
                        <LogoLink />
                        <ButtonIcon
                            url={close}
                            altText="close-icon"
                            classes="burger__close-button"
                            onClick={() => {
                                setActiveButton(!activeButton);
                            }}
                        />
                    </div>
                )}
                <ul className="navigation-links__wrapper">
                    <li>
                        <NavLink
                            to="/"
                            onClick={() => {
                                setActiveButton(false);
                            }}
                        >
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/shop"
                            onClick={() => {
                                setActiveButton(false);
                            }}
                        >
                            Shop
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/about"
                            onClick={() => {
                                setActiveButton(false);
                            }}
                        >
                            About
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </>
    );
}
