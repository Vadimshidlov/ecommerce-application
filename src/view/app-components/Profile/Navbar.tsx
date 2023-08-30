import { useAuth } from "auth-context";
import React from "react";
import { NavLink } from "react-router-dom";
import { AuthService } from "service/AuthService";
import "view/app-components/Profile/style.scss";

export default function Navbar() {
    const authContextApi = useAuth();
    const AuthServiceApi = new AuthService();

    const logoutHandler = async () => {
        localStorage.clear();
        await AuthServiceApi.createAnonymousToken();
        authContextApi?.setIsAuth(false);
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
