import React, { FocusEvent, useEffect, useState } from "react";
// import * as yup from "yup";
import { ValidationError } from "yup";
import TextValidationError from "view/app-components/Registration/components/ErrorsComponents/TextValidationError";
import { getValidationErrorsObject } from "shared/utils/getValidationErrorsObject";
import { DateInput } from "shared/components/DateInput/DateInput";
import {
    getInitialFormData,
    ISignUpForm,
    // maxValidBirthdayDate,
} from "shared/utils/getInitialFormData";
import { getInitialFormErrorsData, IStateErrors } from "shared/utils/getInitialFormErrorsData";
import { getChangeFormByAddressData } from "shared/utils/getChangeFormByAddressData";
import { TextInput } from "shared/components/TextInput/TextInput";
import Text from "view/app-components/Text/text";
import { Button } from "shared/components/button/Button";
import { ButtonIcon } from "shared/components/ButtonIcon/ButtonIcon";
import closedEye from "assets/svg/closedEye.svg";
import openEye from "assets/svg/openEye.svg";
import { userScheme } from "view/app-components/Registration/components/userSheme";
import CountrySelect from "view/app-components/Registration/components/SelectCountry";

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

    const [inputType, setInputType] = useState<string>("password");
    const toggleHideButton = (): void => {
        setInputType(inputType === "password" ? "text" : "password");
    };

    return (
        <form className="registration__form" onSubmit={onFormSubmit}>
            <div className="registration__personal-data">
                <Text classes={["inter-600-font", "font-size_m", "color_blue-dark"]}>
                    Personal data:
                </Text>
                <div className="input__wrapper">
                    <TextInput
                        type="text"
                        name="firstname"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            inputTextHandler(e, "firstname")
                        }
                        onFocus={(e: FocusEvent) => {
                            inputOnFocusHandler(e, "firstname");
                        }}
                        className={`registration__input ${
                            !validationError.firstname ? "" : "input__outline-error"
                        }`}
                        id="fname"
                        value={formData.firstname}
                        placeHolder="Your name"
                        validationError={validationError.firstname ? validationError.firstname : ""}
                    />
                    <TextInput
                        type="text"
                        name="lastname"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            inputTextHandler(e, "lastname")
                        }
                        onFocus={(e: FocusEvent) => {
                            inputOnFocusHandler(e, "lastname");
                        }}
                        className={`registration__input ${
                            !validationError.lastname ? "" : "input__outline-error"
                        }`}
                        id="lname"
                        value={formData.lastname}
                        placeHolder="Your lastname"
                        validationError={validationError.lastname ? validationError.lastname : ""}
                    />
                    <TextInput
                        type="text"
                        name="email"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            inputTextHandler(e, "email")
                        }
                        onFocus={(e: FocusEvent) => {
                            inputOnFocusHandler(e, "email");
                        }}
                        className={`registration__input ${
                            !validationError.email ? "" : "input__outline-error"
                        }`}
                        id="email"
                        value={formData.email}
                        placeHolder="Email address"
                        validationError={validationError.email ? validationError.email : ""}
                    />
                    <div className="password__wrapper">
                        <TextInput
                            type={inputType}
                            name="password"
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                inputTextHandler(e, "password")
                            }
                            onFocus={(e: FocusEvent) => {
                                inputOnFocusHandler(e, "password");
                            }}
                            className={`registration__input ${
                                !validationError.password ? "" : "input__outline-error"
                            }`}
                            id="password"
                            value={formData.password}
                            placeHolder="Password"
                            validationError={
                                validationError.password ? validationError.password : ""
                            }
                        />
                        <ButtonIcon
                            url={inputType === "password" ? closedEye : openEye}
                            altText="icon-eye"
                            classes="button-icon"
                            onClick={toggleHideButton}
                        />
                    </div>
                    <div className="registration__birthday-input">
                        <Text classes={["inter-400-font", "font-size_m", "color_grey-dark"]}>
                            Birthday:
                        </Text>
                        <DateInput
                            className={`registration__birthday-date inter-400-font font-size_m color_grey-dark ${
                                !validationError.birthdayDate ? "" : "input__outline-error"
                            }`}
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
            </div>
            <div className="registration__address-block block-adress">
                <Text classes={["inter-600-font", "font-size_m", "color_blue-dark"]}>
                    Billing address:
                </Text>
                {/* <p className="block-address_title">Billing address:</p> */}
                <div className="registration__address-block-wrapper">
                    <div className="billing_countries__select-block">
                        <Text classes={["inter-400-font", "font-size_m", "color_grey-dark"]}>
                            Country:
                        </Text>
                        {/* <select
                            value={formData.billingCountry}
                            className="block-address_select inter-400-font font-size_m color_grey-dark"
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
                        </select> */}
                        <CountrySelect
                            value={formData.billingCountry}
                            id="billingCountry"
                            name="billingCountry"
                            setFormData={(e: React.ChangeEvent<HTMLSelectElement>) => {
                                const { value } = e.target;
                                setFormData((prevState) => ({
                                    ...prevState,
                                    billingCountry: value,
                                }));
                            }}
                        />
                        <TextValidationError errorMessage={validationError.billingCountry} />
                    </div>
                    <div className="input__wrapper">
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
                                className={`registration__input ${
                                    !validationError.billingStreet ? "" : "input__outline-error"
                                }`}
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
                                className={`registration__input ${
                                    !validationError.billingCity ? "" : "input__outline-error"
                                }`}
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
                                className={`registration__input ${
                                    !validationError.billingPostalCode ? "" : "input__outline-error"
                                }`}
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
                    <div className="registration__default-wrapper">
                        <div className="registration__default-address">
                            <Text classes={["inter-400-font", "font-size_s", "color_grey-dark"]}>
                                Make as shipping address
                            </Text>
                            <input
                                name="defaultAddress"
                                type="checkbox"
                                checked={oneAddress}
                                onChange={handleDefaultAddress}
                            />
                        </div>
                        <div className="registration__default-address">
                            <Text classes={["inter-400-font", "font-size_s", "color_grey-dark"]}>
                                Make as default billing address
                            </Text>
                            <input
                                name="defaultBillingAddress"
                                type="checkbox"
                                checked={defaultBillingAddress}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                    setDefaultBillingAddress(e.target.checked)
                                }
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div hidden={!!oneAddress}>
                <div className="registration__address-block">
                    {/* <p className="block-address_title">Shipping address:</p> */}
                    <Text classes={["inter-600-font", "font-size_m", "color_blue-dark"]}>
                        Shipping address:
                    </Text>
                    <div className="registration__address-block-wrapper">
                        <div className="billing_countries__select-block">
                            <Text classes={["inter-400-font", "font-size_m", "color_grey-dark"]}>
                                Country:
                            </Text>
                            {/* <select
                                value={formData.shippingCountry}
                                className="block-address_select inter-400-font font-size_m color_grey-dark"
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
                            </select> */}
                            <CountrySelect
                                value={formData.shippingCountry}
                                id="shippingCountry"
                                name="shippingCountry"
                                setFormData={(e: React.ChangeEvent<HTMLSelectElement>) => {
                                    const { value } = e.target;
                                    setFormData((prevState) => ({
                                        ...prevState,
                                        shippingCountry: value,
                                    }));
                                }}
                            />
                            <TextValidationError
                                errorMessage={
                                    validationError.shippingCountry && !oneAddress
                                        ? validationError.shippingCountry
                                        : ""
                                }
                            />
                        </div>
                        <div className="input__wrapper">
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
                                    className={`registration__input ${
                                        !validationError.shippingCity ? "" : "input__outline-error"
                                    }`}
                                    id="shippingCity"
                                    value={formData.shippingCity}
                                    placeHolder="City"
                                    validationError={
                                        validationError.shippingCity
                                            ? validationError.shippingCity
                                            : ""
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
                                    className={`registration__input ${
                                        !validationError.shippingStreet
                                            ? ""
                                            : "input__outline-error"
                                    }`}
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
                                    className={`registration__input ${
                                        !validationError.shippingPostalCode
                                            ? ""
                                            : "input__outline-error"
                                    }`}
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
                        <div className="registration__default-address">
                            <Text classes={["inter-400-font", "font-size_s", "color_grey-dark"]}>
                                Make as default shipping address
                            </Text>
                            <input
                                name="defaultShippingAdress"
                                type="checkbox"
                                checked={defaultShippingAddress}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                    setDefaultShippingAddress(e.target.checked)
                                }
                            />
                        </div>
                    </div>
                </div>
            </div>
            <TextValidationError errorMessage={registrationError} />
            <Button
                type="submit"
                text="Sign up"
                textClasses={["space-grotesk-500-font", "font-size_2xl", "color_white"]}
                buttonClasses="button btn-full-width"
            />
        </form>
    );
}
