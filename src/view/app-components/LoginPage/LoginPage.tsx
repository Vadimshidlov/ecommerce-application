import React from "react";
import { AuthForm } from "view/app-components//AuthorizationForm/AuthForm";
import Text from "view/app-components/Text/text";
import { NavLink, Navigate } from "react-router-dom";
import { useAuth } from "auth-context";

export default function LoginPage() {
    const { isAuth } = useAuth();

    if (isAuth) {
        return <Navigate to="/" />;
    }

    return (
        <div>
            <div className="login-title">
                <Text classes={["space-grotesk-500-font", "font-size_heading-4", "page-title"]}>
                    Sign in
                </Text>
            </div>
            <div className="login-description">
                <Text classes={["inter-400-font", "font-size_m"]}>Don’t have an account yet?</Text>
                <NavLink to="/registration" className="inter-600-font font-size_m color_black">
                    Sign up
                </NavLink>
            </div>
            <AuthForm />
        </div>
    );
}
