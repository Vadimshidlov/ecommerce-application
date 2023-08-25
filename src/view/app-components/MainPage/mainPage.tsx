import React from "react";
import "view/app-components/MainPage/style.scss";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "shared/components/button/Button";
import { NavLink } from "react-router-dom";

export default function MainPage() {
    return (
        <div className="main-part">
            <div className="some-content" style={{ maxWidth: "40%", marginLeft: "3rem" }}>
                <NavLink to="/registration">
                    {" "}
                    <Button
                        type="button"
                        text="Sign up"
                        textClasses={["space-grotesk-500-font", "font-size_2xl", "color_white"]}
                        buttonClasses="button"
                    />
                </NavLink>
                <NavLink to="/login">
                    <Button
                        type="button"
                        text="Sign in"
                        textClasses={["space-grotesk-500-font", "font-size_2xl", "color_white"]}
                        buttonClasses="button"
                    />
                </NavLink>
            </div>
        </div>
    );
}
