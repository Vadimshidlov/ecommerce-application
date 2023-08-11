/* eslint-disable @typescript-eslint/no-unused-vars */
// import React, { useState, FocusEvent, FormEvent } from "react";
import React, { useState, FocusEvent } from "react";
import RegistrationButton from "view/app-components/Registration/components/RegistationButton";
import * as yup from "yup";
import { ValidationError } from "yup";
import { RegisterFormDataType } from "view/app-components/Registration/components/getRegisterFormData";

interface ISignUpForm {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
}

interface IValidateError extends Error {
    errors: string[];
}

interface IStateErrors {
    firstname: string;
    lastname: string;
    password: string;
    email: string;
}

const userScheme = yup.object({
    firstname: yup.string().required().min(4).max(25),
    lastname: yup.string().required().min(4).max(25),
    email: yup.string().required().email(),
    password: yup
        .string()
        .required()
        .matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/),
});

const validateEmailSсheme = yup.object({
    email: yup.string().email(),
});

const PASSWORD_CONFIGURE_ERROR_MESSAGE = `
Passwords should contain three of the four character types:
Uppercase letters: A-Z,
Lowercase letters: a-z,
Numbers: 0-9,
Symbols: ~\`!@#$%^&*()_-+={[}]|\\:;"'<,>.?/
`;

type StateErrorsType = "firstname" | "lastname" | "email" | "password" | string;

function RegistrationPage() {
    /* const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState(""); */
    const [validationError, setValidationError] = useState<IStateErrors>({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
    });

    const [formData, setFormData] = useState<ISignUpForm>({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
    });

    const inputTextHandler = async (
        e: React.ChangeEvent<HTMLInputElement>,
        key: keyof RegisterFormDataType,
    ) => {
        const { value } = e.target;
        setFormData({ ...formData, [key]: value });

        // if (e.target.name === "firstname") {
        //     setFirstname(e.target.value);
        // }
        //
        // if (e.target.name === "lastname") {
        //     setLastname(e.target.value);
        // }
        //
        // if (e.target.name === "email") {
        //     setEmail(e.target.value);
        // }
        //
        // if (e.target.name === "password") {
        //     setPassword(e.target.value);
        // }
    };

    const onFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        console.log("formSubmit");
        e.preventDefault();
        try {
            await userScheme.validate(formData, { abortEarly: false });
        } catch (err) {
            if (err instanceof ValidationError) {
                // const stateErrors: { [key: string]: string } = {
                const stateErrors: { [key: string]: string } = {
                    firstname: "",
                    lastname: "",
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
                Already have an account?
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
                            // onBlur={blurHandler}
                            // onChange={(e) => {
                            //     inputTextHandler(e);
                            // }}
                            onChange={(e) => {
                                inputTextHandler(e, "firstname");
                            }}
                            className="registration__input"
                            type="text"
                            name="firstname"
                            id="fname"
                            value={formData.firstname}
                            // required
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
                            // onBlur={blurHandler}
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
                    <label htmlFor="email">
                        {validationError.email && (
                            <span className="registration__error">{validationError.email}</span>
                        )}
                        <input
                            // onBlur={blurHandler}
                            onChange={(e) => {
                                inputTextHandler(e, "email");
                            }}
                            className="registration__input"
                            // type="email"
                            name="email"
                            id="email"
                            value={formData.email}
                            placeholder="Email address"
                            // required
                        />
                    </label>
                </div>
                <div>
                    {validationError.password ? (
                        <span className="registration__error">
                            {validationError.password.length > 28
                                ? PASSWORD_CONFIGURE_ERROR_MESSAGE
                                : validationError.password}
                        </span>
                    ) : null}
                    <label htmlFor="password">
                        {/* {validationError.password && (
                            <div style={{ color: "red" }}>{validationError.password}</div>
                        )} */}
                        <input
                            // onBlur={blurHandler}
                            onChange={(e) => {
                                inputTextHandler(e, "password");
                            }}
                            className="registration__input"
                            type="password"
                            name="password"
                            id="password"
                            value={formData.password}
                            // required
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
