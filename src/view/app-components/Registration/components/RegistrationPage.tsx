import React, { useState } from "react";
import RegistrationButton from "view/app-components/Registration/components/RegistationButton";
import * as yup from "yup";
import { ValidationError } from "yup";
import { RegisterFormDataType } from "view/app-components/Registration/components/getRegisterFormData";
import { PasswordError } from "view/app-components/Registration/components/PasswordError";

interface ISignUpForm {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    date: string;
    billingStreet: string;
    billingCity: string;
    billingPostalCode: string;
    billingCountry: string;
    shippingStreet: string;
    shippingCity: string;
    shippingPostalCode: string;
    shippingCountry: string;
}

interface IStateErrors {
    firstname: string;
    lastname: string;
    password: string;
    date: string;
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

const nowDate = new Date(Date.now());
const currYear = nowDate.toLocaleString("default", { year: "numeric" });
const currMonth = nowDate.toLocaleString("default", { month: "2-digit" });
const currDay = nowDate.toLocaleString("default", { day: "2-digit" });
const validFormatCurrentDate = `${currYear}-${currMonth}-${currDay}`;

const userScheme = yup.object({
    firstname: yup
        .string()
        .required("Firstname is required field")
        .min(4, "Very short firstname")
        .max(25, "Very large firstname"),
    lastname: yup
        .string()
        .required("Lastname is required field")
        .min(4, "Very short lastname")
        .max(25, "Very large lastname"),
    email: yup.string().required("Email is required field").email("Please, write correct email"),
    date: yup
        .date()
        .typeError("Please enter a valid date")
        .required("Date is required field")
        .min("1900-01-01", "Date is too early")
        .max(validFormatCurrentDate, "Date is too late"),
    password: yup
        .string()
        .required()
        .matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/),
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
        .matches(/^[A-Za-z0-9 ]+$/, "No special characters or numbers!"),
    billingPostalCode: yup
        .string()
        .required("Postal code is required field")
        .test("custom-post-code", "Invalid post code", (val) => {
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
        .required("Country is required field")
        .oneOf(["USA", "Belarus", "Russia"], "This country not supported by our service"),
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
        .matches(/^[A-Za-z0-9 ]+$/, "No special characters or numbers!"),
    shippingPostalCode: yup
        .string()
        .required("Postal code is required field")
        .test("custom-post-code", "Invalid post code", (val) => {
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
        .required("Country is required field")
        .oneOf(["USA", "Belarus", "Russia"], "This country not supported by our service"),
});

function RegistrationPage() {
    const [formData, setFormData] = useState<ISignUpForm>({
        firstname: "",
        lastname: "",
        date: `${validFormatCurrentDate}`,
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

    const [validationError, setValidationError] = useState<IStateErrors>({
        firstname: "",
        lastname: "",
        date: "",
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

    const inputTextHandler = async (
        e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>,
        key: keyof RegisterFormDataType,
    ) => {
        const { value } = e.target;
        setFormData({ ...formData, [key]: value });
    };

    const onFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await userScheme.validate(formData, { abortEarly: false });
        } catch (err) {
            if (err instanceof ValidationError) {
                const stateErrors: { [key: string]: string } = {
                    firstname: "",
                    lastname: "",
                    date: "",
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
                };

                err.inner.forEach((error) => {
                    if (error.path && error.message) {
                        if (stateErrors[error.path] !== "") {
                            return;
                        }

                        stateErrors[error.path] = error.message;
                    }
                });

                setValidationError((prevState) => ({ ...prevState, ...stateErrors }));
            }
        }
    };

    return (
        <section className="registration__block">
            <h2 className="registration__title">Sign up</h2>
            <div className="registration__subtitle">
                <p>Already have an account?</p>
                <a className="registration__link" href="#">
                    Sign in
                </a>
            </div>
            <form className="registration__form" onSubmit={onFormSubmit}>
                <p className="block-address_title">Personal data:</p>
                <div>
                    {validationError.firstname ? (
                        <span className="registration__error">{validationError.firstname}</span>
                    ) : null}
                    <label htmlFor="firstname">
                        <input
                            onChange={(e) => {
                                inputTextHandler(e, "firstname");
                            }}
                            className="registration__input"
                            type="text"
                            name="firstname"
                            id="fname"
                            value={formData.firstname}
                            placeholder="Your name"
                        />
                    </label>
                </div>
                <div>
                    <span>
                        {validationError.lastname ? (
                            <span className="registration__error">{validationError.lastname}</span>
                        ) : null}
                    </span>
                    <label htmlFor="lastname">
                        <input
                            onChange={(e) => {
                                inputTextHandler(e, "lastname");
                            }}
                            className="registration__input"
                            type="text"
                            name="lastname"
                            id="lname"
                            value={formData.lastname}
                            placeholder="Your lastname"
                            // required
                        />
                    </label>
                </div>
                <div>
                    {validationError.date ? (
                        <span className="registration__error">{validationError.date}</span>
                    ) : null}
                    <div className="registration__birthday-input">
                        <span>Birthday: </span>
                        <label htmlFor="birthday">
                            <input
                                className="registration__input"
                                type="date"
                                id="birthday"
                                name="birthday"
                                onChange={(e) => {
                                    inputTextHandler(e, "date");
                                }}
                                value={formData.date}
                            />
                        </label>
                    </div>
                </div>

                <div>
                    <label htmlFor="email">
                        {validationError.email && (
                            <span className="registration__error">
                                {validationError.email[0].toUpperCase() +
                                    validationError.email.slice(1)}
                            </span>
                        )}
                        <input
                            onChange={(e) => {
                                inputTextHandler(e, "email");
                            }}
                            className="registration__input"
                            name="email"
                            id="email"
                            value={formData.email}
                            placeholder="Email address"
                        />
                    </label>
                </div>
                <div>
                    {validationError.password ? (
                        <div className="registration__error">
                            {PasswordError(
                                validationError.password[0].toUpperCase() +
                                    validationError.password.slice(1),
                            )}
                        </div>
                    ) : null}
                    <label htmlFor="password">
                        <input
                            onChange={(e) => {
                                inputTextHandler(e, "password");
                            }}
                            className="registration__input"
                            type="password"
                            name="password"
                            id="password"
                            value={formData.password}
                            placeholder="Password"
                        />
                    </label>
                </div>
                <div className="registration__adress-block block-adress">
                    <div className="block-adress_billing">
                        <p className="block-address_title">Billing address:</p>
                        <label htmlFor="billing_country">
                            <p className="billing_countries">Country:</p>
                            {validationError.billingCountry ? (
                                <div className="registration__error">
                                    {validationError.billingCountry}
                                </div>
                            ) : null}
                            <input
                                onChange={(e) => {
                                    inputTextHandler(e, "billingCountry");
                                }}
                                className="registration__input"
                                type="text"
                                name="billing_country"
                                id="billing_country"
                                value={formData.billingCountry}
                                placeholder="Available countries: USA, Russia, Belarus"
                            />
                        </label>
                        {validationError.billingStreet ? (
                            <div className="registration__error">
                                {validationError.billingStreet}
                            </div>
                        ) : null}
                        <label htmlFor="billing_street">
                            <input
                                onChange={(e) => {
                                    inputTextHandler(e, "billingStreet");
                                }}
                                className="registration__input"
                                type="text"
                                name="billing_street"
                                id="billing_street"
                                value={formData.billingStreet}
                                placeholder="street"
                            />
                        </label>
                        {validationError.billingCity ? (
                            <div className="registration__error">{validationError.billingCity}</div>
                        ) : null}
                        <label htmlFor="billing_city">
                            <input
                                onChange={(e) => {
                                    inputTextHandler(e, "billingCity");
                                }}
                                className="registration__input"
                                type="text"
                                name="billing_city"
                                id="billing_city"
                                value={formData.billingCity}
                                placeholder="city"
                            />
                        </label>
                        {validationError.billingPostalCode ? (
                            <div className="registration__error">
                                {validationError.billingPostalCode}
                            </div>
                        ) : null}
                        <label htmlFor="billing_postal_code">
                            <input
                                onChange={(e) => {
                                    inputTextHandler(e, "billingPostalCode");
                                }}
                                className="registration__input"
                                type="text"
                                name="billing_postal_code"
                                id="billing_postal_code"
                                value={formData.billingPostalCode}
                                placeholder="Postal code"
                            />
                        </label>
                    </div>
                    <div className="block-adress_shipping">
                        <p className="block-address_title">Shipping address:</p>
                        <label htmlFor="shipping_country">
                            <p className="billing_countries">Country:</p>
                            {validationError.shippingCountry ? (
                                <div className="registration__error">
                                    {validationError.shippingCountry}
                                </div>
                            ) : null}
                            <input
                                onChange={(e) => {
                                    inputTextHandler(e, "shippingCountry");
                                }}
                                className="registration__input"
                                type="text"
                                name="shipping_country"
                                id="shipping_country"
                                value={formData.shippingCountry}
                                placeholder="Available countries: USA, Russia, Belarus"
                            />
                        </label>
                        <label htmlFor="shipping_city">
                            {validationError.shippingCity ? (
                                <div className="registration__error">
                                    {validationError.shippingCity}
                                </div>
                            ) : null}
                            <input
                                onChange={(e) => {
                                    inputTextHandler(e, "shippingCity");
                                }}
                                className="registration__input"
                                type="text"
                                name="shipping_city"
                                id="shipping_city"
                                value={formData.shippingCity}
                                placeholder="city"
                            />
                        </label>
                        <label htmlFor="shipping_street">
                            {validationError.shippingStreet ? (
                                <div className="registration__error">
                                    {validationError.shippingStreet}
                                </div>
                            ) : null}
                            <input
                                onChange={(e) => {
                                    inputTextHandler(e, "shippingStreet");
                                }}
                                className="registration__input"
                                type="text"
                                name="shipping_street"
                                id="shipping_street"
                                value={formData.shippingStreet}
                                placeholder="street"
                            />
                        </label>
                        <label htmlFor="shipping_postal_code">
                            {validationError.shippingPostalCode ? (
                                <div className="registration__error">
                                    {validationError.shippingPostalCode}
                                </div>
                            ) : null}
                            <input
                                onChange={(e) => {
                                    inputTextHandler(e, "shippingPostalCode");
                                }}
                                className="registration__input"
                                type="text"
                                name="shipping_postal_code"
                                id="shipping_postal_code"
                                value={formData.shippingPostalCode}
                                placeholder="Postal code"
                            />
                        </label>
                    </div>
                </div>
                <RegistrationButton
                    className="registration__button"
                    buttonText="Registration"
                    // onClick={handleSubmit}
                />
            </form>
        </section>
    );
}

export default RegistrationPage;
