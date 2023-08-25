export interface IStateErrors {
    firstname: string;
    lastname: string;
    password: string;
    birthdayDate: string;
    email: string;
    billingStreet: string;
    billingCity: string;
    billingPostalCode: string;
    billingCountry: string;
    shippingStreet: string;
    shippingCity: string;
    shippingPostalCode: string;
    shippingCountry: string;
}

export const getInitialFormErrorsData = (): IStateErrors => ({
    firstname: "",
    lastname: "",
    birthdayDate: "",
    email: "",
    password: "",
    billingStreet: "",
    billingCity: "",
    billingPostalCode: "",
    billingCountry: "",
    shippingStreet: "",
    shippingCity: "",
    shippingPostalCode: "",
    shippingCountry: "",
});
