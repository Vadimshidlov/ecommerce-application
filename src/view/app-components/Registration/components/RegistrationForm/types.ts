import { ISignUpForm } from "shared/utils/getInitialFormData";

export type RegisterFormDataType = {
    firstname: string;
    lastname: string;
    email: string;
    birthdayDate: string;
    password: string;
    billingStreet: string;
    billingCity: string;
    billingPostalCode: string;
    billingCountry: string;
    shippingStreet: string;
    shippingCity: string;
    shippingPostalCode: string;
    shippingCountry: string;
};

export type OnSubmitSignInDataType = {
    onSubmitSignInData: (
        formData: ISignUpForm,
        defaultBillingAddress: boolean,
        defaultShippingAddress: boolean,
    ) => Promise<void>;
    registrationError: string;
    errorHandler: (value: string) => void;
};
