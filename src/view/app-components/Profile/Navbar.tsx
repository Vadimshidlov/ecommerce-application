import { useAuth } from "auth-context";
import React from "react";
import { NavLink } from "react-router-dom";
import { AuthService } from "service/AuthService/AuthService";
import { LoginStore } from "service/LoginStore/LoginStore";
import "view/app-components/Profile/style.scss";

export default function Navbar() {
    const { setIsAuth } = useAuth();
    // const basketService = useRef(new BasketService());
    const AuthServiceApi = new AuthService();

    const logoutHandler = async () => {
        const loginStore = LoginStore.getLoginStore();
        localStorage.clear();
        await AuthServiceApi.createAnonymousToken();

        // setTimeout(async () => {
        //     await basketService.current.createBasket();
        // }, 500);

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
