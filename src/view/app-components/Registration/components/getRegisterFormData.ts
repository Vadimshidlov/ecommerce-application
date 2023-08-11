export type RegisterFormDataType = {
    firstname: string;
    lastname: string;
    email: string;
    date: string;
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

export function getRegisterFormData(): RegisterFormDataType {
    return {
        firstname: "",
        lastname: "",
        email: "",
        date: "",
        password: "",
        billingStreet: "",
        billingCity: "",
        billingPostalCode: "",
        billingCountry: "",
        shippingStreet: "",
        shippingCity: "",
        shippingPostalCode: "",
        shippingCountry: "",
    };
}
