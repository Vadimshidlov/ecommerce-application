import * as yup from "yup";
import { maxValidBirthdayDate } from "shared/utils/getInitialFormData";

export const userScheme = yup.object({
    firstname: yup
        .string()
        .required("Firstname is required field")
        .min(1, "Very short firstname")
        .max(25, "Very large firstname")
        .matches(/^[a-zA-Zа-яА-Я]*$/, "Only letters allowed"),
    lastname: yup
        .string()
        .required("Lastname is required field")
        .min(1, "Very short lastname")
        .max(25, "Very large lastname")
        .matches(/^[a-zA-Zа-яА-Я]*$/, "Only letters allowed"),
    email: yup
        .string()
        .matches(/^[^\s]*$/, "Email must not contain a space")
        .required("Email is a required field")
        .email("Email must be in the format user@example.com")
        .matches(
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            "Email must be in the format user@example.com",
        ),
    birthdayDate: yup
        .date()
        .typeError("Please enter a valid date")
        .required("Date is required field")
        .max(maxValidBirthdayDate, "User must be over 13 years old"),
    password: yup
        .string()
        .required("Password is a required field")
        .min(8, "Password must contain at least 8 characters")
        .matches(/(?=.[A-Z])/, "The password must be received for one capital letter (AZ)")
        .matches(/(?=.[a-z])/, "Password must contain at least one lowercase letter (az)")
        .matches(/(?=.\d)/, "Password must contain at least one number (0-9)")
        .matches(/^[^\s]*$/, "Password must not contain a space")
        .matches(
            /(?=.[!@#$%^&-])/,
            "The password must contain at least one special character (for example, !@#$%^&-)",
        ),
    billingStreet: yup
        .string()
        .required("Street is required field")
        .min(1, "Must contain at least one character")
        .max(25, "Value is very big"),
    billingCity: yup
        .string()
        .required("City is required field")
        .min(1, "Must contain at least one character")
        .max(25, "Value is very big")
        .matches(/^[a-zA-Zа-яА-Я-]+(?: [a-zA-Zа-яА-Я-]+)*$/, "No special characters or numbers!"),
    billingPostalCode: yup
        .string()
        .required("Postal code is required field")
        .test("custom-post-code", "Invalid post code", (val: string) => {
            const regexpForUseCode = /^[0-9]{6}$/;
            const regexpForRussiaCode = /^[0-9]{5}$/;
            const regexpForBelarusCode = /^\\d{6}$/;

            if (regexpForUseCode.test(val)) {
                return true;
            }

            if (regexpForRussiaCode.test(val)) {
                return true;
            }

            return regexpForBelarusCode.test(val);
        }),
    billingCountry: yup
        .string()
        .uppercase()
        .required("Country is required field")
        .oneOf(["US", "BE", "RU"], "Please, write valid country"),
    shippingStreet: yup
        .string()
        .required("Street is required field")
        .min(1, "Must contain at least one character")
        .max(25, "Value is very big"),
    shippingCity: yup
        .string()
        .required("City is required field")
        .min(1, "Must contain at least one character")
        .max(25, "Value is very big")
        .matches(/^[a-zA-Zа-яА-Я-]+(?: [a-zA-Zа-яА-Я-]+)*$/, "No special characters or numbers!"),
    shippingPostalCode: yup
        .string()
        .required("Postal code is required field")
        .test("custom-post-code", "Invalid post code", (val: string) => {
            const regexpForUseCode = /^[0-9]{6}$/;
            const regexpForRussiaCode = /^[0-9]{5}$/;
            const regexpForBelarusCode = /^\\d{6}$/;

            if (regexpForUseCode.test(val)) {
                return true;
            }

            if (regexpForRussiaCode.test(val)) {
                return true;
            }

            return regexpForBelarusCode.test(val);
        }),
    shippingCountry: yup
        .string()
        .uppercase()
        .required("Country is required field")
        .oneOf(["US", "BE", "RU"], "Please, write valid country"),
});
