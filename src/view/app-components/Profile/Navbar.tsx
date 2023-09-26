import { useAuth } from "auth-context";
import React, { useRef } from "react";
import { NavLink } from "react-router-dom";
import { AuthService } from "service/AuthService/AuthService";
import { LoginStore } from "service/LoginStore/LoginStore";
import "view/app-components/Profile/style.scss";
import BasketService from "service/BasketService/BasketService";
import BasketStore from "store/basket-store";
import { useBasketQuantity } from "providers/BasketItemsProvider";

export default function Navbar() {
    const { setIsAuth } = useAuth();
    const basketService = useRef(new BasketService());
    const { updateBasketStore } = BasketStore;
    const { setQuantity } = useBasketQuantity();
    const AuthServiceApi = new AuthService();

    const logoutHandler = async () => {
        const loginStore = LoginStore.getLoginStore();
        localStorage.clear();
        await AuthServiceApi.createAnonymousToken();

        setTimeout(async () => {
            const createBasketResponse = await basketService.current.createBasket();
            updateBasketStore(createBasketResponse);
            const basketResponse = await basketService.current.getCartById();
            setQuantity(basketResponse.lineItems.length);
        }, 100);

        setIsAuth(false);
        loginStore.setAuthStatus(false);
    };

    return (
        <nav className="profile-navbar">
            <NavLink to="adresses">Addresses</NavLink>
            <NavLink to="details">Details</NavLink>
            <NavLink to="password">Password</NavLink>
            <NavLink to="/">
                <button className="button-logout" onClick={logoutHandler}>
                    Logout
                </button>
            </NavLink>
        </nav>
    );
}
