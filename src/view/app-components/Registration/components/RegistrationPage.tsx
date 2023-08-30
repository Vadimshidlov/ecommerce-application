import React, { useRef, useState } from "react";
import { RegistrationService } from "service/RegistrationService/RegistrationService";
import { ISignUpForm } from "shared/utils/getInitialFormData";
import RegistrationForm from "view/app-components/Registration/components/RegistrationForm";
import { useNavigate, Navigate, NavLink } from "react-router-dom";
import { AuthDataStore } from "service/AuthDataStore/AuthDataStore";
import { AxiosError } from "axios";
import { useAuth } from "auth-context";
import { errorRegistrationMessage, successRegistrationMessage } from "shared/utils/notifyMessages";
import Text from "view/app-components/Text/text";
import { LoginStore } from "service/LoginStore/LoginStore";
import LoginService from "service/LoginService/LoginService";

function RegistrationPage() {
    const registrationService = useRef(new RegistrationService());
    const loginService = useRef(new LoginService());
    const authDataStore = useRef(AuthDataStore.getAuthDataStore());
    const navigate = useNavigate();
    const [registrationError, setRegistrationError] = useState("");
    const loginStore = LoginStore.getLoginStore();
    const { setIsAuth } = useAuth();

    const handleSuccessRegistration = () => {
        successRegistrationMessage();
        authDataStore.current.removeTokenFromStore("anonymousAccessToken");
        navigate("/");
        setIsAuth(true);
    };

    const registrationErrorHandler = (errorMessage: string) => {
        setRegistrationError(errorMessage);
    };

    const onSubmitSignInDataCallBack = async (
        formData: ISignUpForm,
        defaultBillingAddress: boolean,
        defaultShippingAddress: boolean,
    ): Promise<void> => {
        try {
            await registrationService.current.createCustomer(
                formData,
                defaultBillingAddress,
                defaultShippingAddress,
            );

            const { email, password } = formData;

            await loginService.current.getAuthToken({ email, password });
            loginStore.setAuthStatus(true);
            await loginService.current.authenticateCustomer({ email, password });
            handleSuccessRegistration();
        } catch (error) {
            if (error instanceof AxiosError) {
                errorRegistrationMessage();
            } else if (error instanceof Error) {
                console.log(error.message, `instanceof Error`);
            }
        }
    };

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
                onSubmitSignInData={onSubmitSignInDataCallBack}
                registrationError={registrationError}
                errorHandler={registrationErrorHandler}
            />
        </section>
    );
}

export default RegistrationPage;
