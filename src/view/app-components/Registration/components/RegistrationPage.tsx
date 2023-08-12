import React, { FocusEvent, useState } from "react";
import RegistrationButton from "view/app-components/Registration/components/RegistationButton";
import * as yup from "yup";
import { ValidationError } from "yup";
import { RegisterFormDataType } from "view/app-components/Registration/components/getRegisterFormData";
import { PasswordError } from "view/app-components/Registration/components/PasswordError";
import { useNavigate } from "react-router-dom";
import { TextInput } from "view/app-components/Registration/components/TextInput";
import TextValidationError from "view/app-components/Registration/components/TextValidationError";

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
        .oneOf(["USA", "Belarus", "Russia"], "Please, write valid country"),
    // .oneOf(["USA", "Belarus", "Russia"], "This country not supported by our service"),
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
        .oneOf(["USA", "Belarus", "Russia"], "Please, write valid country"),
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

    const [defaultAddress, setDefaultAddress] = useState(false);

    const handleDefaultAddress = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDefaultAddress(event.target.checked);

        console.log(event.target);
        console.log(event.target.checked);
    };

    const navigate = useNavigate();

    const inputTextHandler = async (
        e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>,
        key: keyof RegisterFormDataType,
    ) => {
        const { value } = e.target;
        setFormData({ ...formData, [key]: value });
    };

    const inputOnFocusHandler = (e: FocusEvent, key: string) => {
        setValidationError({ ...validationError, [key]: "" });
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
                <button
                    type="button"
                    onClick={() => navigate("/login")}
                    className="registration__link"
                >
                    Sign in
                </button>
            </div>
            <form className="registration__form" onSubmit={onFormSubmit}>
                <p className="block-address_title">Personal data:</p>
                <div>
                    {/* {validationError.firstname ? (
                        <span className="registration__error">{validationError.firstname}</span>
                    ) : null} */}
                    <TextValidationError errorMessage={validationError.firstname} />
                    {/* <label htmlFor="firstname">
                        <input
                            onChange={(e) => {
                                inputTextHandler(e, "firstname");
                            }}
                            onFocus={(e: FocusEvent) => {
                                inputOnFocusHandler(e, "firstname");
                            }}
                            className="registration__input"
                            type="text"
                            name="firstname"
                            id="fname"
                            value={formData.firstname}
                            placeholder="Your name"
                        />
                    </label> */}
                    <TextInput
                        type="text"
                        name="firstname"
                        onChangeHandler={(e: React.ChangeEvent<HTMLInputElement>) =>
                            inputTextHandler(e, "firstname")
                        }
                        onFocusHandler={(e: FocusEvent) => {
                            inputOnFocusHandler(e, "firstname");
                        }}
                        className="registration__input"
                        id="fname"
                        value={formData.firstname}
                        placeHolder="Your name"
                    />
                </div>
                <div>
                    <span>
                        <TextValidationError errorMessage={validationError.lastname} />
                        {/* {validationError.lastname ? (
                            <span className="registration__error">{validationError.lastname}</span>
                        ) : null} */}
                    </span>
                    {/* <label htmlFor="lastname">
                        <input
                            onChange={(e) => {
                                inputTextHandler(e, "lastname");
                            }}
                            onFocus={(e: FocusEvent) => {
                                inputOnFocusHandler(e, "lastname");
                            }}
                            className="registration__input"
                            type="text"
                            name="lastname"
                            id="lname"
                            value={formData.lastname}
                            placeholder="Your lastname"
                        />
                    </label> */}
                    <TextInput
                        type="text"
                        name="lastname"
                        onChangeHandler={(e: React.ChangeEvent<HTMLInputElement>) =>
                            inputTextHandler(e, "lastname")
                        }
                        onFocusHandler={(e: FocusEvent) => {
                            inputOnFocusHandler(e, "lastname");
                        }}
                        className="registration__input"
                        id="lname"
                        value={formData.lastname}
                        placeHolder="Your lastname"
                    />
                </div>
                <div>
                    {/* {validationError.date ? (
                        <span className="registration__error">{validationError.date}</span>
                    ) : null} */}
                    <TextValidationError errorMessage={validationError.date} />
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
                                onFocus={(e: FocusEvent) => {
                                    inputOnFocusHandler(e, "date");
                                }}
                                value={formData.date}
                            />
                        </label>
                    </div>
                </div>
                <div>
                    <TextValidationError errorMessage={validationError.email} />
                    {/* <label htmlFor="email">
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
                            onFocus={(e: FocusEvent) => {
                                inputOnFocusHandler(e, "email");
                            }}
                            className="registration__input"
                            name="email"
                            id="email"
                            value={formData.email}
                            placeholder="Email address"
                        />
                    </label> */}
                    <TextInput
                        type="text"
                        name="email"
                        onChangeHandler={(e: React.ChangeEvent<HTMLInputElement>) =>
                            inputTextHandler(e, "email")
                        }
                        onFocusHandler={(e: FocusEvent) => {
                            inputOnFocusHandler(e, "email");
                        }}
                        className="registration__input"
                        id="lname"
                        value={formData.email}
                        placeHolder="Email address"
                    />
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
                    {/* <label htmlFor="password">
                        <input
                            onChange={(e) => {
                                inputTextHandler(e, "password");
                            }}
                            onFocus={(e: FocusEvent) => {
                                inputOnFocusHandler(e, "password");
                            }}
                            className="registration__input"
                            type="password"
                            name="password"
                            id="password"
                            value={formData.password}
                            placeholder="Password"
                        />
                    </label> */}
                    <TextInput
                        type="password"
                        name="password"
                        onChangeHandler={(e: React.ChangeEvent<HTMLInputElement>) =>
                            inputTextHandler(e, "password")
                        }
                        onFocusHandler={(e: FocusEvent) => {
                            inputOnFocusHandler(e, "password");
                        }}
                        className="registration__input"
                        id="lname"
                        value={formData.password}
                        placeHolder="Password"
                    />
                </div>
                <div className="registration__adress-block block-adress">
                    <div className="block-adress_billing">
                        <p className="block-address_title">Billing address:</p>
                        <div>
                            <p className="billing_countries">Country:</p>
                            <TextValidationError errorMessage={validationError.billingCountry} />
                            {/* {validationError.billingCountry ? (
                                <div className="registration__error">
                                    {validationError.billingCountry}
                                </div>
                            ) : null} */}
                            {/*
                        <label htmlFor="billing_country">
                            <input
                                onChange={(e) => {
                                    inputTextHandler(e, "billingCountry");
                                }}
                                onFocus={(e: FocusEvent) => {
                                    inputOnFocusHandler(e, "billingCountry");
                                }}
                                className="registration__input"
                                type="text"
                                name="billing_country"
                                id="billing_country"
                                value={formData.billingCountry}
                                placeholder="Available countries: USA, Russia, Belarus"
                            />
                        </label>
                            */}
                            <TextInput
                                type="text"
                                name="billingCountry"
                                onChangeHandler={(e: React.ChangeEvent<HTMLInputElement>) =>
                                    inputTextHandler(e, "billingCountry")
                                }
                                onFocusHandler={(e: FocusEvent) => {
                                    inputOnFocusHandler(e, "billingCountry");
                                }}
                                className="registration__input"
                                id="billingCountry"
                                value={formData.billingCountry}
                                placeHolder="Available countries: USA, Russia, Belarus"
                            />
                        </div>
                        <div>
                            {/* {validationError.billingStreet ? (
                                <div className="registration__error">
                                    {validationError.billingStreet}
                                </div>
                            ) : null} */}
                            <TextValidationError errorMessage={validationError.billingStreet} />
                            {/* <label htmlFor="billing_street">
                                <input
                                    onChange={(e) => {
                                        inputTextHandler(e, "billingStreet");
                                    }}
                                    onFocus={(e: FocusEvent) => {
                                        inputOnFocusHandler(e, "billingStreet");
                                    }}
                                    className="registration__input"
                                    type="text"
                                    name="billing_street"
                                    id="billing_street"
                                    value={formData.billingStreet}
                                    placeholder="Street"
                                />
                            </label> */}
                            <TextInput
                                type="text"
                                name="billingStreet"
                                onChangeHandler={(e: React.ChangeEvent<HTMLInputElement>) =>
                                    inputTextHandler(e, "billingStreet")
                                }
                                onFocusHandler={(e: FocusEvent) => {
                                    inputOnFocusHandler(e, "billingStreet");
                                }}
                                className="registration__input"
                                id="billingCountry"
                                value={formData.billingStreet}
                                placeHolder="Street"
                            />
                        </div>
                        <div>
                            {/* {validationError.billingCity ? (
                                <div className="registration__error">
                                    {validationError.billingCity}
                                </div>
                            ) : null} */}
                            <TextValidationError errorMessage={validationError.billingCity} />
                            {/* <label htmlFor="billing_city">
                                <input
                                    onChange={(e) => {
                                        inputTextHandler(e, "billingCity");
                                    }}
                                    onFocus={(e: FocusEvent) => {
                                        inputOnFocusHandler(e, "billingCity");
                                    }}
                                    className="registration__input"
                                    type="text"
                                    name="billing_city"
                                    id="billing_city"
                                    value={formData.billingCity}
                                    placeholder="city"
                                />
                            </label> */}
                            <TextInput
                                type="text"
                                name="billingCity"
                                onChangeHandler={(e: React.ChangeEvent<HTMLInputElement>) =>
                                    inputTextHandler(e, "billingCity")
                                }
                                onFocusHandler={(e: FocusEvent) => {
                                    inputOnFocusHandler(e, "billingCity");
                                }}
                                className="registration__input"
                                id="billingCity"
                                value={formData.billingCity}
                                placeHolder="City"
                            />
                        </div>
                        <div>
                            {/* {validationError.billingPostalCode ? (
                                <div className="registration__error">
                                    {validationError.billingPostalCode}
                                </div>
                            ) : null} */}
                            <TextValidationError errorMessage={validationError.billingPostalCode} />
                            {/* <label htmlFor="billing_postal_code">
                                <input
                                    onChange={(e) => {
                                        inputTextHandler(e, "billingPostalCode");
                                    }}
                                    onFocus={(e: FocusEvent) => {
                                        inputOnFocusHandler(e, "billingPostalCode");
                                    }}
                                    className="registration__input"
                                    type="text"
                                    name="billing_postal_code"
                                    id="billing_postal_code"
                                    value={formData.billingPostalCode}
                                    placeholder="Postal code"
                                />
                            </label> */}
                            <TextInput
                                type="text"
                                name="billingPostalCode"
                                onChangeHandler={(e: React.ChangeEvent<HTMLInputElement>) =>
                                    inputTextHandler(e, "billingPostalCode")
                                }
                                onFocusHandler={(e: FocusEvent) => {
                                    inputOnFocusHandler(e, "billingPostalCode");
                                }}
                                className="registration__input"
                                id="billingPostalCode"
                                value={formData.billingPostalCode}
                                placeHolder="Postal code"
                            />
                        </div>
                    </div>
                    <div className="registration__default-address">
                        <p>Make default address for billing and shipping address</p>
                        <input
                            name="defaultAddress"
                            type="checkbox"
                            checked={defaultAddress}
                            onChange={handleDefaultAddress}
                        />
                    </div>
                    <div className="block-adress_shipping" hidden={!!defaultAddress}>
                        <p className="block-address_title">Shipping address:</p>

                        {/* {validationError.shippingCountry && !defaultAddress ? (
                            <div className="registration__error">
                                {validationError.shippingCountry}
                            </div>
                        ) : null} */}
                        <div>
                            <p className="billing_countries">Country:</p>
                            <TextValidationError
                                errorMessage={
                                    validationError.shippingCountry && !defaultAddress
                                        ? validationError.shippingCountry
                                        : ""
                                }
                            />
                            {/* <label htmlFor="shipping_country">
                                <input
                                    onChange={(e) => {
                                        inputTextHandler(e, "shippingCountry");
                                    }}
                                    onFocus={(e: FocusEvent) => {
                                        inputOnFocusHandler(e, "shippingCountry");
                                    }}
                                    className="registration__input"
                                    type="text"
                                    name="shipping_country"
                                    id="shipping_country"
                                    value={formData.shippingCountry}
                                    placeholder="Available countries: USA, Russia, Belarus"
                                />
                            </label> */}
                            <TextInput
                                type="text"
                                name="shippingCountry"
                                onChangeHandler={(e: React.ChangeEvent<HTMLInputElement>) =>
                                    inputTextHandler(e, "shippingCountry")
                                }
                                onFocusHandler={(e: FocusEvent) => {
                                    inputOnFocusHandler(e, "shippingCountry");
                                }}
                                className="registration__input"
                                id="shippingCountry"
                                value={formData.shippingCountry}
                                placeHolder="Available countries: USA, Russia, Belarus"
                            />
                        </div>
                        <div>
                            {/* {validationError.shippingCity && !defaultAddress ? (
                                <div className="registration__error">
                                    {validationError.shippingCity}
                                </div>
                            ) : null} */}
                            <TextValidationError
                                errorMessage={
                                    validationError.shippingCity && !defaultAddress
                                        ? validationError.shippingCity
                                        : ""
                                }
                            />
                            {/* <label htmlFor="shipping_city">
                                <input
                                    onChange={(e) => {
                                        inputTextHandler(e, "shippingCity");
                                    }}
                                    onFocus={(e: FocusEvent) => {
                                        inputOnFocusHandler(e, "shippingCity");
                                    }}
                                    className="registration__input"
                                    type="text"
                                    name="shipping_city"
                                    id="shipping_city"
                                    value={formData.shippingCity}
                                    placeholder="city"
                                />
                            </label> */}
                            <TextInput
                                type="text"
                                name="shippingCity"
                                onChangeHandler={(e: React.ChangeEvent<HTMLInputElement>) =>
                                    inputTextHandler(e, "shippingCity")
                                }
                                onFocusHandler={(e: FocusEvent) => {
                                    inputOnFocusHandler(e, "shippingCity");
                                }}
                                className="registration__input"
                                id="shippingCity"
                                value={formData.shippingCity}
                                placeHolder="City"
                            />
                        </div>
                        <div>
                            {/* {validationError.shippingStreet && !defaultAddress ? (
                                <div className="registration__error">
                                    {validationError.shippingStreet}
                                </div>
                            ) : null} */}
                            <TextValidationError
                                errorMessage={
                                    validationError.shippingStreet && !defaultAddress
                                        ? validationError.shippingStreet
                                        : ""
                                }
                            />
                            {/* <label htmlFor="shipping_street">
                                <input
                                    onChange={(e) => {
                                        inputTextHandler(e, "shippingStreet");
                                    }}
                                    onFocus={(e: FocusEvent) => {
                                        inputOnFocusHandler(e, "shippingStreet");
                                    }}
                                    className="registration__input"
                                    type="text"
                                    name="shipping_street"
                                    id="shipping_street"
                                    value={formData.shippingStreet}
                                    placeholder="street"
                                    hidden={!!defaultAddress}
                                />
                            </label> */}
                            <TextInput
                                type="text"
                                name="shippingStreet"
                                onChangeHandler={(e: React.ChangeEvent<HTMLInputElement>) =>
                                    inputTextHandler(e, "shippingStreet")
                                }
                                onFocusHandler={(e: FocusEvent) => {
                                    inputOnFocusHandler(e, "shippingStreet");
                                }}
                                className="registration__input"
                                id="shippingStreet"
                                value={formData.shippingStreet}
                                placeHolder="Street"
                            />
                        </div>
                        <div>
                            {/* {validationError.shippingPostalCode && !defaultAddress ? (
                                <div className="registration__error">
                                    {validationError.shippingPostalCode}
                                </div>
                            ) : null} */}
                            <TextValidationError
                                errorMessage={
                                    validationError.shippingPostalCode && !defaultAddress
                                        ? validationError.shippingPostalCode
                                        : ""
                                }
                            />
                            {/* <label htmlFor="shipping_postal_code">
                                <input
                                    onChange={(e) => {
                                        inputTextHandler(e, "shippingPostalCode");
                                    }}
                                    onFocus={(e: FocusEvent) => {
                                        inputOnFocusHandler(e, "shippingPostalCode");
                                    }}
                                    className="registration__input"
                                    type="text"
                                    name="shipping_postal_code"
                                    id="shipping_postal_code"
                                    value={formData.shippingPostalCode}
                                    placeholder="Postal code"
                                    hidden={!!defaultAddress}
                                />
                            </label> */}
                            <TextInput
                                type="text"
                                name="shippingPostalCode"
                                onChangeHandler={(e: React.ChangeEvent<HTMLInputElement>) =>
                                    inputTextHandler(e, "shippingPostalCode")
                                }
                                onFocusHandler={(e: FocusEvent) => {
                                    inputOnFocusHandler(e, "shippingPostalCode");
                                }}
                                className="registration__input"
                                id="shippingPostalCode"
                                value={formData.shippingPostalCode}
                                placeHolder="Postal code"
                            />
                        </div>
                    </div>
                </div>
                <RegistrationButton className="registration__button" buttonText="Registration" />
            </form>
        </section>
    );
}

export default RegistrationPage;
