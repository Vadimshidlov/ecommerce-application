import React, { useState } from "react";
import { LogoLink } from "view/app-components/Header/LogoLink/LogoLink";
import { ButtonIcon } from "shared/components/ButtonIcon/ButtonIcon";
import close from "assets/svg/close.svg";
import search from "assets/svg/search.svg";

export function Search() {
    const [isOpen, setIsOpen] = useState(true);

    const handleClose = () => {
        setIsOpen(false);
    };

    return (
        <>
            <div className={`search-overlay ${isOpen ? "open" : "closed"}`} />
            <div className={`search container ${isOpen ? "open" : "closed"}`}>
                <div className="search__header">
                    <LogoLink />
                    <ButtonIcon
                        url={close}
                        altText="close-btn"
                        classes="search__close-btn"
                        onClick={handleClose}
                    />
                </div>
                <div className="search__input-wrapper">
                    <input
                        type="text"
                        className="inter-400-font font-size_m search__input"
                        placeholder="Search products"
                    />
                    <ButtonIcon url={search} altText="close-btn" classes="search__btn" />
                </div>
            </div>
        </>
    );
}
