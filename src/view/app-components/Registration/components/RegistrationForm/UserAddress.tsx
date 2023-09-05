import React from "react";
import Text from "shared/components/Text/text";
import CountrySelect from "view/app-components/Registration/components/SelectCountry";
import TextValidationError from "view/app-components/Registration/components/ErrorsComponents/TextValidationError";
import { TextInput } from "shared/components/TextInput/TextInput";
import { ISignUpForm } from "shared/utils/getInitialFormData";
import { IStateErrors } from "shared/utils/getInitialFormErrorsData";
import { RegisterFormDataType } from "view/app-components/Registration/components/RegistrationForm/types";

export type UserAddressPropsType = {
    isBillingAddress: boolean;
    addressTitle: string;
    formData: ISignUpForm;
    setFormData: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    validationError: IStateErrors;
    inputTextHandler: (
        e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>,
    ) => Promise<void>;
    inputOnFocusHandler: (e: React.FocusEvent<HTMLInputElement>) => void;
    countryName: keyof RegisterFormDataType;
    streetName: keyof RegisterFormDataType;
    cityName: keyof RegisterFormDataType;
    postalCodeName: keyof RegisterFormDataType;
    oneAddress: boolean;
    handleDefaultAddress: (event: React.ChangeEvent<HTMLInputElement>) => void;
    defaultBillingAddress: boolean;
    setDefaultAddress: React.Dispatch<React.SetStateAction<boolean>>;
    defaultAddressName: string;
    defaultShippingAddress: boolean;
    setDefaultShippingAddress: React.Dispatch<React.SetStateAction<boolean>>;
};

function UserAddress({
    isBillingAddress,
    addressTitle,
    formData,
    setFormData,
    validationError,
    inputTextHandler,
    inputOnFocusHandler,
    countryName,
    streetName,
    cityName,
    postalCodeName,
    oneAddress,
    handleDefaultAddress,
    defaultBillingAddress,
    setDefaultAddress,
    defaultAddressName,
    defaultShippingAddress,
    setDefaultShippingAddress,
}: UserAddressPropsType) {
    return (
        <div className="registration__address-block block-adress">
            <Text classes={["inter-600-font", "font-size_m", "color_blue-dark"]}>
                {addressTitle}
            </Text>
            <div className="registration__address-block-wrapper">
                <div className="billing_countries__select-block">
                    <Text classes={["inter-400-font", "font-size_m", "color_grey-dark"]}>
                        Country:
                    </Text>

                    <CountrySelect
                        value={formData[countryName]}
                        id={countryName}
                        name={countryName}
                        setFormData={setFormData}
                    />
                    <TextValidationError errorMessage={validationError[countryName]} />
                </div>
                <div className="input__wrapper">
                    <div>
                        <TextInput
                            type="text"
                            name={streetName}
                            onChange={inputTextHandler}
                            onFocus={inputOnFocusHandler}
                            id={streetName}
                            value={formData[streetName]}
                            placeholder="Street"
                            validationError={
                                validationError[streetName] ? validationError[streetName] : ""
                            }
                        />
                    </div>
                    <div>
                        <TextInput
                            type="text"
                            name={cityName}
                            onChange={inputTextHandler}
                            onFocus={inputOnFocusHandler}
                            id={cityName}
                            value={formData[cityName]}
                            placeholder="City"
                            validationError={
                                validationError[cityName] ? validationError[cityName] : ""
                            }
                        />
                    </div>
                    <div>
                        <TextInput
                            type="text"
                            name={postalCodeName}
                            onChange={inputTextHandler}
                            onFocus={inputOnFocusHandler}
                            id={postalCodeName}
                            value={formData[postalCodeName]}
                            placeholder="Postal code"
                            validationError={
                                validationError[postalCodeName]
                                    ? validationError[postalCodeName]
                                    : ""
                            }
                        />
                    </div>
                </div>
                <div className="registration__default-wrapper">
                    {isBillingAddress ? (
                        <div>
                            <div className="registration__default-address">
                                <Text
                                    classes={["inter-400-font", "font-size_s", "color_grey-dark"]}
                                >
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
                                <Text
                                    classes={["inter-400-font", "font-size_s", "color_grey-dark"]}
                                >
                                    Make as default billing address
                                </Text>
                                <input
                                    name={defaultAddressName}
                                    type="checkbox"
                                    checked={defaultBillingAddress}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                        setDefaultAddress(e.target.checked)
                                    }
                                />
                            </div>
                        </div>
                    ) : (
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
                    )}
                </div>
            </div>
        </div>
    );
}

export default UserAddress;
