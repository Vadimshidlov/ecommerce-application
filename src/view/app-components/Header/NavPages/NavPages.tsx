import React from "react";
import { NavLink } from "react-router-dom";

export default function NavPages() {
    return (
        <nav>
            <ul className="navigation-links">
                <li>
                    <NavLink to="/">Home</NavLink>
                </li>
                <li>
                    <NavLink to="/shop">Shop</NavLink>
                </li>
                <li>
                    <NavLink to="/">About</NavLink>
                </li>
            </ul>
        </nav>
    );
}
