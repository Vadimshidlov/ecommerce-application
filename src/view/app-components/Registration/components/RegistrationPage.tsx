import React, { FocusEvent, useState } from "react";
import RegistrationButton from "view/app-components/Registration/components/RegistationButton";
import * as yup from "yup";
import { ValidationError } from "yup";
import { PasswordError } from "view/app-components/Registration/components/ErrorsComponents/PasswordError";
import { useNavigate } from "react-router-dom";
import { TextInput } from "view/app-components/Registration/components/InputComponents/TextInput";
import TextValidationError from "view/app-components/Registration/components/ErrorsComponents/TextValidationError";
import { getValidationErrorsObject } from "shared/utils/getValidationErrorsObject";
import { DateInput } from "view/app-components/Registration/components/InputComponents/DateInput";
import {
    getInitialFormData,
    ISignUpForm,
    validFormatCurrentDate,
} from "shared/utils/getInitialFormData";
import { getInitialFormErrorsData, IStateErrors } from "shared/utils/getInitialFormErrorsData";

export type RegisterFormDataType = {
    firstname: string;
    lastname: string;
    email: string;
    birthdayDate: string;
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
    birthdayDate: yup
        .date()
        .typeError("Please enter a valid date")
        .required("Date is required field")
        .min("2010-01-01", "Date is too early")
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
    const [formData, setFormData] = useState<ISignUpForm>(getInitialFormData());
    const [validationError, setValidationError] = useState<IStateErrors>(
        getInitialFormErrorsData(),
    );
    const [defaultAddress, setDefaultAddress] = useState(false);
    const handleDefaultAddress = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDefaultAddress(event.target.checked);
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

            console.log(formData, "formData");
        } catch (err) {
            if (err instanceof ValidationError) {
                const errorsList = [...err.inner];

                setValidationError((prevState) => ({
                    ...prevState,
                    ...getValidationErrorsObject(errorsList),
                }));
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
                    <TextValidationError errorMessage={validationError.firstname} />
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
                    <TextValidationError errorMessage={validationError.lastname} />
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
                    <TextValidationError errorMessage={validationError.birthdayDate} />
                    <div className="registration__birthday-input">
                        <span>Birthday: </span>
                        <DateInput
                            className="registration__input"
                            id="birthdayDate"
                            name="birthdayDate"
                            onChangeHandler={(e: React.ChangeEvent<HTMLInputElement>) =>
                                inputTextHandler(e, "birthdayDate")
                            }
                            onFocusHandler={(e: FocusEvent) => {
                                inputOnFocusHandler(e, "birthdayDate");
                            }}
                            value={formData.birthdayDate}
                        />
                    </div>
                </div>
                <div>
                    <TextValidationError errorMessage={validationError.email} />
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
                        id="email"
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
                        id="password"
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
                            <TextValidationError errorMessage={validationError.billingStreet} />
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
                                id="billingStreet"
                                value={formData.billingStreet}
                                placeHolder="Street"
                            />
                        </div>
                        <div>
                            <TextValidationError errorMessage={validationError.billingCity} />
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
                            <TextValidationError errorMessage={validationError.billingPostalCode} />
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
                        <div>
                            <p className="billing_countries">Country:</p>
                            <TextValidationError
                                errorMessage={
                                    validationError.shippingCountry && !defaultAddress
                                        ? validationError.shippingCountry
                                        : ""
                                }
                            />
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
                            <TextValidationError
                                errorMessage={
                                    validationError.shippingCity && !defaultAddress
                                        ? validationError.shippingCity
                                        : ""
                                }
                            />
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
                            <TextValidationError
                                errorMessage={
                                    validationError.shippingStreet && !defaultAddress
                                        ? validationError.shippingStreet
                                        : ""
                                }
                            />
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
                            <TextValidationError
                                errorMessage={
                                    validationError.shippingPostalCode && !defaultAddress
                                        ? validationError.shippingPostalCode
                                        : ""
                                }
                            />
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
