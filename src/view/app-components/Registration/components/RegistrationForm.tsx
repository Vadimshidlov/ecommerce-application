import React, { FocusEvent, useEffect, useState } from "react";
import RegistrationButton from "view/app-components/Registration/components/RegistationButton";
import * as yup from "yup";
import { ValidationError } from "yup";
import { useNavigate } from "react-router-dom";
import TextValidationError from "view/app-components/Registration/components/ErrorsComponents/TextValidationError";
import { getValidationErrorsObject } from "shared/utils/getValidationErrorsObject";
import { DateInput } from "shared/components/DateInput/DateInput";
import {
    getInitialFormData,
    ISignUpForm,
    maxValidBirthdayDate,
} from "shared/utils/getInitialFormData";
import { getInitialFormErrorsData, IStateErrors } from "shared/utils/getInitialFormErrorsData";
import { getChangeFormByAddressData } from "shared/utils/getFinallyFormData";
import { TextInput } from "shared/components/TextInput/TextInput";

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
    email: yup
        .string()
        .required("Email is required field")
        .email("Email must be in the format user@example.com")
        .matches(/^(?!\S\s)/, "Email must not contain a space"),
    birthdayDate: yup
        .date()
        .typeError("Please enter a valid date")
        .required("Date is required field")
        .max(maxValidBirthdayDate, "User must be over 13 years old"),
    password: yup
        .string()
        .required("Password is a required field")
        .min(8, "Password must contain at least 8 characters")
        .matches(
            /(?=.[!@#$%^&-])/,
            "The password must contain at least one special character (for example, !@#$%^&-)",
        )
        .matches(/^(?!\S\s)/, "Password must not contain a space")
        .matches(/(?=.[A-Z])/, "The password must be received for one capital letter (AZ)")
        .matches(/(?=.[a-z])/, "Password must contain at least one lowercase letter (az)")
        .matches(/(?=.\d)/, "Password must contain at least one number (0-9)"),
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

export type OnSubmitSignInDataType = {
    onSubmitSignInData: (
        formData: ISignUpForm,
        defaultBillingAddress: boolean,
        defaultShippingAddress: boolean,
    ) => Promise<void>;
    registrationError: string;
    errorHandler: (value: string) => void;
};

export default function RegistrationForm({
    onSubmitSignInData,
    registrationError,
    errorHandler,
}: OnSubmitSignInDataType) {
    const [formData, setFormData] = useState<ISignUpForm>(getInitialFormData());
    const [validationError, setValidationError] = useState<IStateErrors>(
        getInitialFormErrorsData(),
    );
    const [oneAddress, setOneAddress] = useState(false);
    const [defaultBillingAddress, setDefaultBillingAddress] = useState(false);
    const [defaultShippingAddress, setDefaultShippingAddress] = useState(false);

    const handleDefaultAddress = (event: React.ChangeEvent<HTMLInputElement>) => {
        setOneAddress(event.target.checked);
        setDefaultShippingAddress(false);
    };

    useEffect(() => {
        setDefaultShippingAddress(false);
    }, [oneAddress]);

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

        if (e.target instanceof HTMLInputElement && e.target.name === "email") {
            errorHandler("");
        }
    };

    const onFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const finallyFormData = getChangeFormByAddressData(oneAddress, formData);

            setFormData((prevState) => ({ ...prevState, ...finallyFormData }));

            await userScheme.validate(finallyFormData, { abortEarly: false });

            await onSubmitSignInData(
                finallyFormData,
                defaultBillingAddress,
                defaultShippingAddress,
            );
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
                    <TextInput
                        type="text"
                        name="firstname"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            inputTextHandler(e, "firstname")
                        }
                        onFocus={(e: FocusEvent) => {
                            inputOnFocusHandler(e, "firstname");
                        }}
                        className="registration__input"
                        id="fname"
                        value={formData.firstname}
                        placeHolder="Your name"
                        validationError={validationError.firstname ? validationError.firstname : ""}
                    />
                </div>
                <div>
                    <TextInput
                        type="text"
                        name="lastname"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            inputTextHandler(e, "lastname")
                        }
                        onFocus={(e: FocusEvent) => {
                            inputOnFocusHandler(e, "lastname");
                        }}
                        className="registration__input"
                        id="lname"
                        value={formData.lastname}
                        placeHolder="Your lastname"
                        validationError={validationError.lastname ? validationError.lastname : ""}
                    />
                </div>
                <div>
                    <div className="registration__birthday-input">
                        <span>Birthday: </span>
                        <DateInput
                            className="registration__birthday-input"
                            id="birthdayDate"
                            name="birthdayDate"
                            onChangeHandler={(e: React.ChangeEvent<HTMLInputElement>) =>
                                inputTextHandler(e, "birthdayDate")
                            }
                            onFocusHandler={(e: FocusEvent) => {
                                inputOnFocusHandler(e, "birthdayDate");
                            }}
                            value={formData.birthdayDate}
                            validationError={
                                validationError.birthdayDate ? validationError.birthdayDate : ""
                            }
                        />
                    </div>
                </div>
                <div>
                    <TextInput
                        type="text"
                        name="email"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            inputTextHandler(e, "email")
                        }
                        onFocus={(e: FocusEvent) => {
                            inputOnFocusHandler(e, "email");
                        }}
                        className="registration__input"
                        id="email"
                        value={formData.email}
                        placeHolder="Email address"
                        validationError={validationError.email ? validationError.email : ""}
                    />
                </div>
                <div>
                    <TextInput
                        type="password"
                        name="password"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            inputTextHandler(e, "password")
                        }
                        onFocus={(e: FocusEvent) => {
                            inputOnFocusHandler(e, "password");
                        }}
                        className="registration__input"
                        id="password"
                        value={formData.password}
                        placeHolder="Password"
                        validationError={validationError.password ? validationError.password : ""}
                    />
                </div>
                <div className="registration__adress-block block-adress">
                    <div className="block-adress_billing">
                        <p className="block-address_title">Billing address:</p>
                        <div className="registration__default-address">
                            <p>Make as shipping address</p>
                            <input
                                name="defaultAddress"
                                type="checkbox"
                                checked={oneAddress}
                                onChange={handleDefaultAddress}
                            />
                        </div>
                        <div className="registration__default-address">
                            <p>Make as default billing address</p>
                            <input
                                name="defaultBillingAddress"
                                type="checkbox"
                                checked={defaultBillingAddress}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                    setDefaultBillingAddress(e.target.checked)
                                }
                            />
                        </div>
                        <div className="billing_countries__select-block">
                            <p className="billing_countries">Country:</p>
                            <select
                                value={formData.billingCountry}
                                className="block-address_select"
                                name="billingCountry"
                                id="billingCountry"
                                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                                    const { value } = e.target;
                                    setFormData((prevState) => ({
                                        ...prevState,
                                        billingCountry: value,
                                    }));
                                }}
                            >
                                <option value="US">USA</option>
                                <option value="RU">Russia</option>
                                <option value="BE">Belarus</option>
                            </select>
                            <TextValidationError errorMessage={validationError.billingCountry} />
                        </div>
                        <div>
                            <TextInput
                                type="text"
                                name="billingStreet"
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                    inputTextHandler(e, "billingStreet")
                                }
                                onFocus={(e: FocusEvent) => {
                                    inputOnFocusHandler(e, "billingStreet");
                                }}
                                className="registration__input"
                                id="billingStreet"
                                value={formData.billingStreet}
                                placeHolder="Street"
                                validationError={
                                    validationError.billingStreet
                                        ? validationError.billingStreet
                                        : ""
                                }
                            />
                        </div>
                        <div>
                            <TextInput
                                type="text"
                                name="billingCity"
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                    inputTextHandler(e, "billingCity")
                                }
                                onFocus={(e: FocusEvent) => {
                                    inputOnFocusHandler(e, "billingCity");
                                }}
                                className="registration__input"
                                id="billingCity"
                                value={formData.billingCity}
                                placeHolder="City"
                                validationError={
                                    validationError.billingCity ? validationError.billingCity : ""
                                }
                            />
                        </div>
                        <div>
                            <TextInput
                                type="text"
                                name="billingPostalCode"
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                    inputTextHandler(e, "billingPostalCode")
                                }
                                onFocus={(e: FocusEvent) => {
                                    inputOnFocusHandler(e, "billingPostalCode");
                                }}
                                className="registration__input"
                                id="billingPostalCode"
                                value={formData.billingPostalCode}
                                placeHolder="Postal code"
                                validationError={
                                    validationError.billingPostalCode
                                        ? validationError.billingPostalCode
                                        : ""
                                }
                            />
                        </div>
                    </div>
                    <div className="block-adress_shipping" hidden={!!oneAddress}>
                        <p className="block-address_title">Shipping address:</p>
                        <div className="registration__default-address">
                            <p>Make as default shipping address</p>
                            <input
                                name="defaultShippingAdress"
                                type="checkbox"
                                checked={defaultShippingAddress}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                    setDefaultShippingAddress(e.target.checked)
                                }
                            />
                        </div>
                        <div className="billing_countries__select-block">
                            <p className="billing_countries">Country:</p>

                            <select
                                value={formData.shippingCountry}
                                className="block-address_select"
                                name="shippingCountry"
                                id="shippingCountry"
                                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                                    const { value } = e.target;
                                    setFormData((prevState) => ({
                                        ...prevState,
                                        shippingCountry: value,
                                    }));
                                }}
                            >
                                <option value="US">USA</option>
                                <option value="RU">Russia</option>
                                <option value="BE">Belarus</option>
                            </select>
                            <TextValidationError
                                errorMessage={
                                    validationError.shippingCountry && !oneAddress
                                        ? validationError.shippingCountry
                                        : ""
                                }
                            />
                        </div>
                        <div>
                            <TextInput
                                type="text"
                                name="shippingCity"
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                    inputTextHandler(e, "shippingCity")
                                }
                                onFocus={(e: FocusEvent) => {
                                    inputOnFocusHandler(e, "shippingCity");
                                }}
                                className="registration__input"
                                id="shippingCity"
                                value={formData.shippingCity}
                                placeHolder="City"
                                validationError={
                                    validationError.shippingCity ? validationError.shippingCity : ""
                                }
                            />
                        </div>
                        <div>
                            <TextInput
                                type="text"
                                name="shippingStreet"
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                    inputTextHandler(e, "shippingStreet")
                                }
                                onFocus={(e: FocusEvent) => {
                                    inputOnFocusHandler(e, "shippingStreet");
                                }}
                                className="registration__input"
                                id="shippingStreet"
                                value={formData.shippingStreet}
                                placeHolder="Street"
                                validationError={
                                    validationError.shippingStreet
                                        ? validationError.shippingStreet
                                        : ""
                                }
                            />
                        </div>
                        <div>
                            <TextInput
                                type="text"
                                name="shippingPostalCode"
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                    inputTextHandler(e, "shippingPostalCode")
                                }
                                onFocus={(e: FocusEvent) => {
                                    inputOnFocusHandler(e, "shippingPostalCode");
                                }}
                                className="registration__input"
                                id="shippingPostalCode"
                                value={formData.shippingPostalCode}
                                placeHolder="Postal code"
                                validationError={
                                    validationError.shippingPostalCode
                                        ? validationError.shippingPostalCode
                                        : ""
                                }
                            />
                        </div>
                    </div>
                </div>
                <TextValidationError errorMessage={registrationError} />
                <RegistrationButton className="registration__button" buttonText="Sign up" />
            </form>
        </section>
    );
}
