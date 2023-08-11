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
}

interface IStateErrors {
    firstname: string;
    lastname: string;
    password: string;
    date: string;
    email: string;
}

const nowDate = new Date(Date.now());
const currYear = nowDate.toLocaleString("default", { year: "numeric" });
const currMonth = nowDate.toLocaleString("default", { month: "2-digit" });
const currDay = nowDate.toLocaleString("default", { day: "2-digit" });
const validFormatCurrentDate = `${currYear}-${currMonth}-${currDay}`;
console.log(validFormatCurrentDate);

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
});

function RegistrationPage() {
    const [validationError, setValidationError] = useState<IStateErrors>({
        firstname: "",
        lastname: "",
        date: "",
        email: "",
        password: "",
    });

    const [formData, setFormData] = useState<ISignUpForm>({
        firstname: "",
        lastname: "",
        date: `${validFormatCurrentDate}`,
        email: "",
        password: "",
    });

    const inputTextHandler = async (
        e: React.ChangeEvent<HTMLInputElement>,
        key: keyof RegisterFormDataType,
    ) => {
        const { value } = e.target;
        setFormData({ ...formData, [key]: value });
    };

    const onFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        console.log("formSubmit");
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
                };

                err.inner.forEach((error) => {
                    if (error.path && error.message) {
                        if (stateErrors[error.path] !== "") {
                            return;
                        }

                        stateErrors[error.path] = error.message;
                    }
                });
                console.log(stateErrors);
                console.log(stateErrors.password, `password`);
                console.log(stateErrors.password.length, `password length`);

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
