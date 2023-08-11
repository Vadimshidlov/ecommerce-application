import React from "react";
import "view/app-components/Header/CustomerButtons/style.scss";

import { SearchButton } from "view/app-components/Header/buttons/searchButton";
import { UserButton } from "view/app-components/Header/buttons/userButton";
import { LogoutButton } from "view/app-components/Header/buttons/logoutButton";
import { BasketButton } from "view/app-components/Header/buttons/basketButton";
import QuantityItemsInBasket from "view/app-components/Header/buttons/quantityItemsInBasket";
import { NavLink } from "react-router-dom";

export function CustomerButtons() {
    return (
        <div className="customer-buttons">
            <SearchButton />
            <NavLink to="/login">
                <UserButton />
            </NavLink>
            <LogoutButton />
            <BasketButton />
            <QuantityItemsInBasket />
        </div>
    );
}
