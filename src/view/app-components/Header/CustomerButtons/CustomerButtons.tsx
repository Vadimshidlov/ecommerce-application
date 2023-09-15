import React from "react";
import "view/app-components/Header/CustomerButtons/style.scss";
import { LoginButton } from "view/app-components/Header/buttons/loginButton";
import { BasketButton } from "view/app-components/Header/buttons/basketButton";
import QuantityItemsInBasket from "view/app-components/Header/buttons/quantityItemsInBasket";
import { NavLink } from "react-router-dom";
import { useAuth } from "auth-context";
import { UserButton } from "view/app-components/Header/buttons/userButton";

export function CustomerButtons() {
    const authContetxtApi = useAuth();

    return (
        <div className="customer-buttons">
            <NavLink
                to="/login"
                className={`${!authContetxtApi?.isAuth ? "button-box" : ""}`}
                hidden={!!authContetxtApi?.isAuth}
            >
                <LoginButton />
            </NavLink>
            <NavLink
                to="/profile/adresses"
                className={`${authContetxtApi?.isAuth ? "button-box" : ""}`}
                hidden={!authContetxtApi?.isAuth}
            >
                <UserButton />
            </NavLink>
            <div className="customer-buttons__basket-wrapper">
                <NavLink to="/basket">
                    <BasketButton />
                </NavLink>
                <QuantityItemsInBasket />
            </div>
        </div>
    );
}
