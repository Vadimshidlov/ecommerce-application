import React, { FocusEvent, useEffect, useState } from "react";
import { ValidationError } from "yup";
import TextValidationError from "view/app-components/Registration/components/ErrorsComponents/TextValidationError";
import { getValidationErrorsObject } from "shared/utils/getValidationErrorsObject";
import { getInitialFormData, ISignUpForm } from "shared/utils/getInitialFormData";
import { getInitialFormErrorsData, IStateErrors } from "shared/utils/getInitialFormErrorsData";
import { getChangeFormByAddressData } from "shared/utils/getChangeFormByAddressData";
import { Button } from "shared/components/button/Button";
import { userScheme } from "view/app-components/Registration/components/userSheme";
import { OnSubmitSignInDataType } from "view/app-components/Registration/components/RegistrationForm/types";
import UserDataInput from "view/app-components/Registration/components/RegistrationForm/UserDataComponent";
import UserAddress from "view/app-components/Registration/components/RegistrationForm/UserAddress";

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

    const countrySelectHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { value, name } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
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
            <UserDataInput
                formDataProps={formData}
                validationErrorProps={validationError}
                inputOnFocusHandler={inputOnFocusHandler}
                inputTextHandler={inputTextHandler}
            />
            <div className="registration__address-block block-adress">
                <UserAddress
                    isBillingAddress
                    addressTitle="Billing address:"
                    formData={formData}
                    setFormData={countrySelectHandler}
                    defaultBillingAddress={defaultBillingAddress}
                    countryName="billingCountry"
                    validationError={validationError}
                    inputOnFocusHandler={inputOnFocusHandler}
                    inputTextHandler={inputTextHandler}
                    oneAddress={oneAddress}
                    cityName="billingCity"
                    handleDefaultAddress={handleDefaultAddress}
                    setDefaultAddress={setDefaultBillingAddress}
                    postalCodeName="billingPostalCode"
                    streetName="billingStreet"
                    defaultAddressName="defaultBillingAddress"
                    defaultShippingAddress={defaultShippingAddress}
                    setDefaultShippingAddress={setDefaultShippingAddress}
                />
            </div>
            <div hidden={!!oneAddress}>
                <UserAddress
                    isBillingAddress={false}
                    addressTitle="Shipping address:"
                    formData={formData}
                    setFormData={countrySelectHandler}
                    defaultBillingAddress={defaultBillingAddress}
                    countryName="shippingCountry"
                    validationError={validationError}
                    inputOnFocusHandler={inputOnFocusHandler}
                    inputTextHandler={inputTextHandler}
                    oneAddress={oneAddress}
                    cityName="shippingCity"
                    handleDefaultAddress={handleDefaultAddress}
                    setDefaultAddress={setDefaultBillingAddress}
                    postalCodeName="shippingPostalCode"
                    streetName="shippingStreet"
                    defaultAddressName="defaultShippingAdress"
                    defaultShippingAddress={defaultShippingAddress}
                    setDefaultShippingAddress={setDefaultShippingAddress}
                />
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
