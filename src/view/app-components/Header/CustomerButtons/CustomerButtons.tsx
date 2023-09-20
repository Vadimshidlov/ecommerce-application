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
    const authContetxtApi = useAuth();
    const { quantity, setQuantity } = useBasketQuantity();
    const BASKET_SERVICE = useRef(new BasketService());

    useEffect(() => {
        (async () => {
            const basketResponse = await BASKET_SERVICE.current.getCartById();
            setQuantity(basketResponse.lineItems.length);
        })();
    }, [setQuantity]);

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
                {quantity > 0 ? <QuantityItemsInBasket quantity={quantity} /> : null}
            </div>
        </div>
    );
}
