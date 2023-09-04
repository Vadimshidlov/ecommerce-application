import React from "react";
import { AuthForm } from "view/app-components//AuthorizationForm/AuthForm";
import Text from "shared/components/Text/text";
import { NavLink, Navigate } from "react-router-dom";
import { useAuth } from "auth-context";

export default function LoginPage() {
    const { isAuth } = useAuth();

    if (isAuth) {
        return <Navigate to="/" />;
    }

    return (
        <section className="login__container">
            <div className="login__title">
                <Text classes={["space-grotesk-500-font", "font-size_heading-3", "page-title"]}>
                    Sign in
                </Text>
            </div>
            <div className="login__subtitle">
                <Text classes={["inter-400-font", "font-size_m"]}>Don’t have an account yet?</Text>
                <NavLink to="/registration" className="inter-600-font font-size_m color_black">
                    Sign up
                </NavLink>
            </div>
            <AuthForm />
        </section>
    );
}
