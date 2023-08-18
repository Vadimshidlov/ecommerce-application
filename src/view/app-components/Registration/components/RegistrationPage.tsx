import React, { useRef, useState } from "react";
import LoginService from "service/LoginService";
import { AuthCustomerDataType, RegistrationService } from "service/RegistrationService";
import { ISignUpForm } from "shared/utils/getInitialFormData";
import RegistrationForm from "view/app-components/Registration/components/RegistrationForm";
import { useNavigate } from "react-router-dom";
import { AuthDataStore } from "service/AuthDataStore";
import { AxiosError } from "axios";
import { useAuth } from "auth-context";

function RegistrationPage() {
    const registrationService = useRef(new RegistrationService());
    const loginService = useRef(new LoginService());
    const authDataStore = useRef(AuthDataStore.getAuthDataStore());
    const navigate = useNavigate();
    const [registrationError, setRegistrationError] = useState("");
    const { setIsAuth } = useAuth();

    const handleSuccessRegistration = () => {
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

            const authCustomerData: AuthCustomerDataType = {
                email: formData.email,
                password: formData.password,
            };

            await loginService.current.getAuthToken(authCustomerData);
            await loginService.current.authenticateCustomer(authCustomerData);
            handleSuccessRegistration();
        } catch (error) {
            if (error instanceof AxiosError) {
                console.log(error, `AxiosError`);
                console.log(error.response?.data.message, `AxiosError`);
                registrationErrorHandler(error.response?.data.message);
            } else if (error instanceof Error) {
                console.log(error.message, `instanceof Error`);
            }
            // console.log(error"Something error");
        }
    };

    return (
        <div>
            <RegistrationForm
                onSubmitSignInData={onSubmitSignInDataCallBack}
                registrationError={registrationError}
                errorHandler={registrationErrorHandler}
            />
        </div>
    );
}

export default RegistrationPage;
