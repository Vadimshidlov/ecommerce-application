import React from "react";
import Header from "view/app-components/Header/Header";
import { AuthForm } from "view/app-components//AuthorizationForm/AuthForm";
import Text from "view/app-components/Text/text";
import { NavLink } from "react-router-dom";

export default function LoginPage() {
    return (
        <div>
            <Header />
            <div className="login-title">
                <Text classes={["space-grotesk-500-font", "font-size_heading-4", "page-title"]}>
                    Sign in
                </Text>
            </div>
            <div className="login-description">
                <Text classes={["inter-400-font", "font-size_m"]}>Don’t have an accout yet?</Text>
                <NavLink to="/registration" className="inter-600-font font-size_m color_black">
                    Sign up
                </NavLink>
            </div>
            <AuthForm />
        </div>
    );
}
