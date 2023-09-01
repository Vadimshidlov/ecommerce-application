import * as yup from "yup";

export function getValidationErrorsDetails(errorsList: yup.ValidationError[]): {
    [key: string]: string;
} {
    const formErrorsObject: { [key: string]: string } = {
        firstName: "",
        lastName: "",
        email: "",
        birthdayDate: "",
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
