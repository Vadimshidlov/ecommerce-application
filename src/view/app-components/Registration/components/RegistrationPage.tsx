import React from "react";
import RegistrationForm from "view/app-components/Registration/components/RegistrationForm/RegistrationForm";
import { Navigate, NavLink } from "react-router-dom";
import { useAuth } from "auth-context";
import Text from "shared/components/Text/text";
import useRegistration from "view/app-components/Registration/useRegistration";

function RegistrationPage() {
    const { onSubmit, registrationError, registrationErrorHandler } = useRegistration();
    const { isAuth } = useAuth();

    if (isAuth) {
        return <Navigate to="/" />;
    }

    return (
        <section className="registration__container">
            <Text classes={["space-grotesk-500-font", "font-size_heading-3", "page-title"]}>
                Sign up
            </Text>
            <div className="registration__subtitle">
                <Text classes={["inter-400-font", "font-size_m"]}>Already have an account?</Text>
                <NavLink to="/login" className="inter-600-font font-size_m color_black">
                    Sign in
                </NavLink>
            </div>
            <RegistrationForm
                onSubmitSignInData={onSubmit}
                registrationError={registrationError}
                errorHandler={registrationErrorHandler}
            />
        </section>
    );
}

export default RegistrationPage;
