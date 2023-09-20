import React, { useEffect, useRef } from "react";
import "view/app-components/Header/CustomerButtons/style.scss";
import { LoginButton } from "view/app-components/Header/buttons/loginButton";
import { BasketButton } from "view/app-components/Header/buttons/basketButton";
import QuantityItemsInBasket from "view/app-components/Header/buttons/quantityItemsInBasket";
import { NavLink } from "react-router-dom";
import { useAuth } from "auth-context";
import { UserButton } from "view/app-components/Header/buttons/userButton";
import { useBasketQuantity } from "providers/BasketItemsProvider";
import BasketService from "service/BasketService/BasketService";

export function CustomerButtons() {
    const { isAuth } = useAuth();
    const { quantity, setQuantity } = useBasketQuantity();
    const BASKET_SERVICE = useRef(new BasketService());

    useEffect(() => {
        const intervalId = setInterval(async () => {
            if (localStorage.length >= 5) {
                (async () => {
                    const basketResponse = await BASKET_SERVICE.current.getCartById();
                    setQuantity(basketResponse.lineItems.length);
                })();

                clearInterval(intervalId);
            }
        }, 100);
    }, [setQuantity, isAuth]);

    return (
        <div className="customer-buttons">
            <NavLink to="/login" className={`${!isAuth ? "button-box" : ""}`} hidden={!!isAuth}>
                <LoginButton />
            </NavLink>
            <NavLink
                to="/profile/adresses"
                className={`${isAuth ? "button-box" : ""}`}
                hidden={!isAuth}
            >
                <UserButton />
            </NavLink>
            <div className="customer-buttons__basket-wrapper">
                <NavLink to="/basket">
                    <BasketButton />
                </NavLink>
                {quantity > 0 ? <QuantityItemsInBasket quantity={quantity} /> : null}
            </div>
        </div>
    );
}
