import React, { FocusEvent, useEffect, useState } from "react";
import { ValidationError } from "yup";
import TextValidationError from "view/app-components/Registration/components/ErrorsComponents/TextValidationError";
import { getValidationErrorsObject } from "shared/utils/getValidationErrorsObject";
// import { DateInput } from "shared/components/DateInput/DateInput";
import { getInitialFormData, ISignUpForm } from "shared/utils/getInitialFormData";
import { getInitialFormErrorsData, IStateErrors } from "shared/utils/getInitialFormErrorsData";
import { getChangeFormByAddressData } from "shared/utils/getChangeFormByAddressData";
import { TextInput } from "shared/components/TextInput/TextInput";
import Text from "view/app-components/Text/text";
import { Button } from "shared/components/button/Button";
// import { ButtonIcon } from "shared/components/ButtonIcon/ButtonIcon";
// import closedEye from "assets/svg/closedEye.svg";
// import openEye from "assets/svg/openEye.svg";
import { userScheme } from "view/app-components/Registration/components/userSheme";
import CountrySelect from "view/app-components/Registration/components/SelectCountry";
import { OnSubmitSignInDataType } from "view/app-components/Registration/components/RegistrationForm/types";
import UserDataComponent from "view/app-components/Registration/components/RegistrationForm/UserDataComponent";

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
        // key: keyof RegisterFormDataType,
    ) => {
        const { value, name } = e.target;

        setFormData({ ...formData, [name]: value });
    };

    const inputOnFocusHandler = (e: FocusEvent) => {
        let name: string = "";
        if (e.target instanceof HTMLInputElement) {
            name = e.target.name;
        }

        setValidationError({ ...validationError, [name]: "" });

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
        <form className="registration__form" onSubmit={onFormSubmit}>
            <UserDataComponent
                formDataProps={formData}
                validationErrorProps={validationError}
                inputOnFocusHandler={inputOnFocusHandler}
                inputTextHandler={inputTextHandler}
            />
            <div className="registration__address-block block-adress">
                <Text classes={["inter-600-font", "font-size_m", "color_blue-dark"]}>
                    Billing address:
                </Text>
                <div className="registration__address-block-wrapper">
                    <div className="billing_countries__select-block">
                        <Text classes={["inter-400-font", "font-size_m", "color_grey-dark"]}>
                            Country:
                        </Text>

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
                                onChange={inputTextHandler}
                                onFocus={inputOnFocusHandler}
                                id="billingStreet"
                                value={formData.billingStreet}
                                placeholder="Street"
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
                                onChange={inputTextHandler}
                                onFocus={inputOnFocusHandler}
                                id="billingCity"
                                value={formData.billingCity}
                                placeholder="City"
                                validationError={
                                    validationError.billingCity ? validationError.billingCity : ""
                                }
                            />
                        </div>
                        <div>
                            <TextInput
                                type="text"
                                name="billingPostalCode"
                                onChange={inputTextHandler}
                                onFocus={inputOnFocusHandler}
                                id="billingPostalCode"
                                value={formData.billingPostalCode}
                                placeholder="Postal code"
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
                                    onChange={inputTextHandler}
                                    onFocus={inputOnFocusHandler}
                                    id="shippingCity"
                                    value={formData.shippingCity}
                                    placeholder="City"
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
                                    onChange={inputTextHandler}
                                    onFocus={inputOnFocusHandler}
                                    id="shippingStreet"
                                    value={formData.shippingStreet}
                                    placeholder="Street"
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
                                    onChange={inputTextHandler}
                                    onFocus={inputOnFocusHandler}
                                    id="shippingPostalCode"
                                    value={formData.shippingPostalCode}
                                    placeholder="Postal code"
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
