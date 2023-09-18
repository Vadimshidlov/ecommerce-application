import { useAuth } from "auth-context";
import { AxiosError } from "axios";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthDataStore } from "service/AuthDataStore/AuthDataStore";
import LoginService from "service/LoginService/LoginService";
import { LoginStore } from "service/LoginStore/LoginStore";
import { RegistrationService } from "service/RegistrationService/RegistrationService";
import { ISignUpForm } from "shared/utils/getInitialFormData";
import { errorRegistrationMessage, successRegistrationMessage } from "shared/utils/notifyMessages";
import BasketService from "service/BasketService/BasketService";

export type UseRegistrationType = {
    onSubmit: (
        formData: ISignUpForm,
        defaultBillingAddress: boolean,
        defaultShippingAddress: boolean,
    ) => Promise<void>;
    registrationErrorHandler: (errorMessage: string) => void;
    registrationError: string;
};

function useRegistration(): UseRegistrationType {
    const registrationService = useRef(new RegistrationService());
    const BASKET_SERVICE = useRef(new BasketService());
    const loginService = useRef(new LoginService());
    const loginStore = LoginStore.getLoginStore();
    const authDataStore = useRef(AuthDataStore.getAuthDataStore());
    const navigate = useNavigate();
    const { setIsAuth } = useAuth();
    const [registrationError, setRegistrationError] = useState("");

    const registrationErrorHandler = (errorMessage: string) => {
        setRegistrationError(errorMessage);
    };

    const handleSuccessRegistration = () => {
        successRegistrationMessage();
        authDataStore.current.removeTokenFromStore("anonymousAccessToken");
        navigate("/");
        setIsAuth(true);
    };

    const onSubmit = async (
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

            // +++ new logic
            BASKET_SERVICE.current.getActiveCart();
            handleSuccessRegistration();
        } catch (error) {
            if (error instanceof AxiosError) {
                errorRegistrationMessage();
            } else if (error instanceof Error) {
                console.log(error.message);
            }
        }
    };

    return { onSubmit, registrationErrorHandler, registrationError };
}

export default useRegistration;
