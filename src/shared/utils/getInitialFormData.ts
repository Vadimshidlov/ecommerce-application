export interface ISignUpForm {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    birthdayDate: string;
    billingStreet: string;
    billingCity: string;
    billingPostalCode: string;
    billingCountry: string;
    shippingStreet: string;
    shippingCity: string;
    shippingPostalCode: string;
    shippingCountry: string;
}

const nowDate = new Date(Date.now());

const currYear = nowDate.toLocaleString("default", { year: "numeric" });

const currMonth = nowDate.toLocaleString("default", { month: "2-digit" });

const currDay = nowDate.toLocaleString("default", { day: "2-digit" });

export const validFormatCurrentDate = `${currYear}-${currMonth}-${currDay}`;

const maxValidYear = String(Number(currYear) - 13);

export const maxValidBirthdayDate = `${maxValidYear}-${currMonth}-${currDay}`;

export const getInitialFormData = (): ISignUpForm => ({
    firstname: "",
    lastname: "",
    birthdayDate: `${validFormatCurrentDate}`,
    email: "",
    password: "",
    billingStreet: "",
    billingCity: "",
    billingPostalCode: "",
    billingCountry: "BE",
    shippingStreet: "",
    shippingCity: "",
    shippingPostalCode: "",
    shippingCountry: "BE",
});
