import * as yup from "yup";

export function getValidationErrorsAdress(errorsList: yup.ValidationError[]): {
    [key: string]: string;
} {
    const formErrorsObject: { [key: string]: string } = {
        // firstname: "",
        // lastname: "",
        // birthdayDate: "",
        // email: "",
        // password: "",
        billingStreet: "",
        billingCity: "",
        billingPostalCode: "",
        billingCountry: "",
        // shippingStreet: "",
        // shippingCity: "",
        // shippingPostalCode: "",
        // shippingCountry: "",
    };

    errorsList.forEach((error) => {
        if (error.path && error.message) {
            if (formErrorsObject[error.path] !== "") {
                return;
            }

            formErrorsObject[error.path] = error.message;
        }
    });

    return formErrorsObject;
}
