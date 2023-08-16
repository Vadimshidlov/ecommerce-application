import React, { useRef } from "react";
import LoginService from "service/LoginService";
import { AuthCustomerDataType, RegistrationService } from "service/RegistrationService";
import { ISignUpForm } from "shared/utils/getInitialFormData";
import RegistrationForm from "view/app-components/Registration/components/RegistrationForm";

function RegistrationPage() {
    // const getToken = async () => {
    //     const AuthServiceApi = new AuthService();
    //     AuthServiceApi.createAnonymousToken();
    // };
    const registrationService = useRef(new RegistrationService());
    const loginService = useRef(new LoginService());

    const onSubmitSignInDataCallBack = async (formData: ISignUpForm): Promise<void> => {
        try {
            await registrationService.current.createCustomer(formData);

            const authCustomerData: AuthCustomerDataType = {
                email: formData.email,
                password: formData.password,
            };

            await loginService.current.getAuthToken(authCustomerData);
            await loginService.current.authenticateCustomer(authCustomerData);
        } catch (error) {
            console.log("Something error");
        }
    };

    return <RegistrationForm onSubmitSignInData={onSubmitSignInDataCallBack} />;
}

export default RegistrationPage;
