// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { FocusEvent, useEffect, useState } from "react";
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
        .min(8, "Password should be more than 8 characters")
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
    // .oneOf(["USA", "Belarus", "Russia"], "Please, write valid country"),
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
    // .oneOf(["USA", "Belarus", "Russia"], "Please, write valid country"),
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
    // const [shippingCountrySelect, setShippingCountrySelect] = useState("BE");
    const [formData, setFormData] = useState<ISignUpForm>(getInitialFormData());
    const [validationError, setValidationError] = useState<IStateErrors>(
        getInitialFormErrorsData(),
    );
    const [oneAddress, setOneAddress] = useState(false);
    const [defaultBillingAddress, setDefaultBillingAddress] = useState(false);
    const [defaultShippingAddress, setDefaultShippingAddress] = useState(false);

    // useEffect(() => {
    //     console.log(formData, `formData`);
    // }, [formData]);

    const handleDefaultAddress = (event: React.ChangeEvent<HTMLInputElement>) => {
        setOneAddress(event.target.checked);
    };

    const changeFormByAddress = async (isOneAdress: boolean) => {
        if (isOneAdress) {
            const defaultAddresses = {
                shippingCity: formData.billingCity,
                shippingCountry: formData.billingCountry,
                shippingStreet: formData.billingStreet,
                shippingPostalCode: formData.billingPostalCode,
            };

            setFormData({ ...formData, ...defaultAddresses });
        } else {
            const defaultAddresses = {
                shippingCity: "",
                shippingCountry: "",
                shippingStreet: "",
                shippingPostalCode: "",
            };

            setFormData({ ...formData, ...defaultAddresses });
        }
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
        if (e.target instanceof HTMLInputElement && e.target.name === "email") {
            errorHandler("");
        }
    };

    const onFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            await changeFormByAddress(oneAddress);
            await userScheme.validate(formData, { abortEarly: false });

            await onSubmitSignInData(formData, defaultBillingAddress, defaultShippingAddress);
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
            {/* <button type="button" onClick={getToken}>
                Token
            </button> */}
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
                    />
                </div>
                <div>
                    <TextValidationError errorMessage={validationError.lastname} />
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
                            <TextValidationError errorMessage={validationError.billingCountry} />
                            {/* <TextInput
                                type="text"
                                name="billingCountry"
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                    inputTextHandler(e, "billingCountry")
                                }
                                onFocus={(e: FocusEvent) => {
                                    inputOnFocusHandler(e, "billingCountry");
                                }}
                                className="registration__input"
                                id="billingCountry"
                                value={formData.billingCountry}
                                placeHolder="Available countries: USA, Russia, Belarus"
                            /> */}
                            <select
                                value={formData.billingCountry}
                                className="block-adress_select"
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
                        </div>
                        <div>
                            <TextValidationError errorMessage={validationError.billingStreet} />
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
                            />
                        </div>
                        <div>
                            <TextValidationError errorMessage={validationError.billingCity} />
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
                            />
                        </div>
                        <div>
                            <TextValidationError errorMessage={validationError.billingPostalCode} />
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
                            <TextValidationError
                                errorMessage={
                                    validationError.shippingCountry && !oneAddress
                                        ? validationError.shippingCountry
                                        : ""
                                }
                            />
                            <select
                                value={formData.shippingCountry}
                                className="block-adress_select"
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
                            {/* <TextInput
                                type="text"
                                name="shippingCountry"
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                    inputTextHandler(e, "shippingCountry")
                                }
                                onFocus={(e: FocusEvent) => {
                                    inputOnFocusHandler(e, "shippingCountry");
                                }}
                                className="registration__input"
                                id="shippingCountry"
                                value={formData.shippingCountry}
                                placeHolder="Available countries: USA, Russia, Belarus"
                            /> */}
                        </div>
                        <div>
                            <TextValidationError
                                errorMessage={
                                    validationError.shippingCity && !oneAddress
                                        ? validationError.shippingCity
                                        : ""
                                }
                            />
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
                            />
                        </div>
                        <div>
                            <TextValidationError
                                errorMessage={
                                    validationError.shippingStreet && !oneAddress
                                        ? validationError.shippingStreet
                                        : ""
                                }
                            />
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
                            />
                        </div>
                        <div>
                            <TextValidationError
                                errorMessage={
                                    validationError.shippingPostalCode && !oneAddress
                                        ? validationError.shippingPostalCode
                                        : ""
                                }
                            />
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
                            />
                        </div>
                    </div>
                </div>
                <TextValidationError errorMessage={registrationError} />
                <RegistrationButton className="registration__button" buttonText="Registration" />
            </form>
        </section>
    );
}