import React, { FocusEvent, useEffect, useState } from "react";
import Text from "shared/components/Text/text";
import EditButton from "view/app-components/Profile/EditButton";
import {
    getInitialProfileAdressBilling,
    getInitialProfileAdressShipping,
    isBillingDefault,
    isShippingDefault,
} from "view/app-components/Profile/profile-utils";
import "view/app-components/Profile/style.scss";
import * as yup from "yup";
import { ValidationError } from "yup";
import { getValidationErrorsAdress } from "shared/utils/getValidationErrorAdress";
import { TextInput } from "shared/components/TextInput/TextInput";
import TextValidationError from "view/app-components/Registration/components/ErrorsComponents/TextValidationError";
import {
    changeBillingAdress,
    changeShippingAdress,
    removeDefaultBillingAddressAPI,
    removeDefaultShippingAddressAPI,
    setDefaultBillingAddressAPI,
    setDefaultShippingAddressAPI,
} from "view/app-components/Profile/axiosProfile";

const getInitialAdress = (): AdressType => ({
    id: "",
    streetName: "",
    postalCode: "",
    city: "",
    country: "",
});

const billingScheme = yup.object({
    streetName: yup
        .string()
        .required("Street is required field")
        .min(1, "Must contain at least one character")
        .max(25, "Value is very big"),
    city: yup
        .string()
        .required("City is required field")
        .min(1, "Must contain at least one character")
        .max(25, "Value is very big")
        .matches(/^[a-zA-Zа-яА-Я-]+(?: [a-zA-Zа-яА-Я-]+)*$/, "No special characters or numbers!"),
    postalCode: yup
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
    country: yup
        .string()
        .uppercase()
        .required("Country is required field")
        .oneOf(["US", "BE", "RU"], "Please, write valid country"),
});

type AdressType = {
    id: string;
    streetName: string;
    postalCode: string;
    city: string;
    country: string;
};

export default function ProfileAdressesPage() {
    const [editBilling, setEditBilling] = useState<boolean>(false);
    const [editShipping, setEditShipping] = useState<boolean>(false);
    const [defaultBillingAddress, setDefaultBillingAddress] = useState(false);
    const [defaultShippingAddress, setDefaultShippingAddress] = useState(false);
    const [dataBilling, setdataBilling] = useState<AdressType>(getInitialAdress());
    const [dataShipping, setdataShipping] = useState<AdressType>(getInitialAdress());
    const [validationError, setValidationError] = useState<AdressType>(getInitialAdress());
    const [validationErrorShipping, setValidationErrorShipping] = useState<AdressType>(
        getInitialAdress(),
    );

    const setActualBillingAdressAPI = async () => {
        if (!defaultBillingAddress) {
            await setDefaultBillingAddressAPI();
        } else {
            await removeDefaultBillingAddressAPI();
        }
    };

    const setActualShippingAdressAPI = async () => {
        if (!defaultShippingAddress) {
            await setDefaultShippingAddressAPI();
        } else {
            await removeDefaultShippingAddressAPI();
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            setdataBilling(await getInitialProfileAdressBilling());
            setdataShipping(await getInitialProfileAdressShipping());
            setDefaultBillingAddress(await isBillingDefault());
            setDefaultShippingAddress(await isShippingDefault());
        };
        fetchData();
    }, []);

    const inputBillingAddressHandler = async (
        e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>,
        key: keyof AdressType,
    ) => {
        const { value } = e.target;

        setdataBilling({ ...dataBilling, [key]: value });
    };

    const inputShippingAddressHandler = async (
        e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>,
        key: keyof AdressType,
    ) => {
        const { value } = e.target;

        setdataShipping({ ...dataShipping, [key]: value });
    };

    const billingAddressHandler = async (billingAddress: AdressType) => {
        try {
            await billingScheme.validate(billingAddress, { abortEarly: false });
            setEditBilling(!editBilling);
        } catch (err) {
            if (err instanceof ValidationError) {
                const errorsList = [...err.inner];
                setValidationError((prevState) => ({
                    ...prevState,
                    ...getValidationErrorsAdress(errorsList),
                }));
            }
        }
    };

    const shippingAddressHandler = async (shippingAddress: AdressType) => {
        try {
            await billingScheme.validate(shippingAddress, { abortEarly: false });
            setEditShipping(!editShipping);
        } catch (err) {
            if (err instanceof ValidationError) {
                const errorsList = [...err.inner];
                setValidationErrorShipping((prevState) => ({
                    ...prevState,
                    ...getValidationErrorsAdress(errorsList),
                }));
            }
        }
    };

    const inputOnFocusHandler = (e: FocusEvent, key: string) => {
        setValidationError({ ...validationError, [key]: "" });
    };

    const inputShippingOnFocusHandler = (e: FocusEvent, key: string) => {
        setValidationErrorShipping({ ...validationErrorShipping, [key]: "" });
    };

    const onBillingAdressSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            await billingAddressHandler(dataBilling);
            await changeBillingAdress(dataBilling);
        } catch (err) {
            if (err instanceof ValidationError) {
                const errorsList = [...err.inner];
                setValidationError((prevState) => ({
                    ...prevState,
                    ...getValidationErrorsAdress(errorsList),
                }));
            }
        }
    };

    const onShippingAdressSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            await shippingAddressHandler(dataShipping);
            await changeShippingAdress(dataShipping);
        } catch (err) {
            if (err instanceof ValidationError) {
                const errorsList = [...err.inner];
                setValidationError((prevState) => ({
                    ...prevState,
                    ...getValidationErrorsAdress(errorsList),
                }));
            }
        }
    };

    return (
        <div className="adresses_forms">
            <form className="adressBilling__form" onSubmit={onBillingAdressSubmit}>
                <div className="adresses">
                    <div className={`billing ${!editBilling ? "adress" : "adress-edit"}`}>
                        <div className="adress-tittle">
                            <Text classes={["inter-600-font", "font-size_m", "color_blue-dark"]}>
                                Billing address:
                            </Text>
                            {editBilling ? (
                                <button type="submit" className="save-button">
                                    <Text classes={["inter-600-font", "font-size_m"]}>Save</Text>
                                </button>
                            ) : (
                                <EditButton
                                    onClick={() => {
                                        setEditBilling(!editBilling);
                                    }}
                                />
                            )}
                        </div>
                        {editBilling ? (
                            <>
                                <div className="adress-line">
                                    Country:{" "}
                                    <select
                                        value={dataBilling.country}
                                        className="inter-400-font font-size_m adress__input address-form__select"
                                        name="country"
                                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                                            const { value } = e.target;
                                            setdataBilling((prevState) => ({
                                                ...prevState,
                                                country: value,
                                            }));
                                        }}
                                    >
                                        <option value="US">USA</option>
                                        <option value="RU">Russia</option>
                                        <option value="BE">Belarus</option>
                                    </select>
                                    <TextValidationError errorMessage={validationError.country} />
                                </div>
                                <div className="adress-line">
                                    City:{" "}
                                    <TextInput
                                        type="text"
                                        placeholder=""
                                        value={dataBilling.city}
                                        className={`inter-400-font font-size_m adress__input ${
                                            !validationError.city ? "" : "input__outline-error"
                                        }`}
                                        name="city"
                                        id="billingCity"
                                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                            inputBillingAddressHandler(event, "city");
                                        }}
                                        onFocus={(e: FocusEvent) => {
                                            inputOnFocusHandler(e, "city");
                                        }}
                                        validationError={
                                            validationError.city ? validationError.city : ""
                                        }
                                    />
                                </div>
                                <div className="adress-line">
                                    Street:{" "}
                                    <TextInput
                                        type="text"
                                        placeholder=""
                                        id="billingStreet"
                                        value={dataBilling.streetName}
                                        className={`inter-400-font font-size_m adress__input ${
                                            !validationError.streetName
                                                ? ""
                                                : "input__outline-error"
                                        }`}
                                        name="streetName"
                                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                            inputBillingAddressHandler(event, "streetName");
                                        }}
                                        onFocus={(e: FocusEvent) => {
                                            inputOnFocusHandler(e, "streetName");
                                        }}
                                        validationError={
                                            validationError.streetName
                                                ? validationError.streetName
                                                : ""
                                        }
                                    />
                                </div>
                                <div className="adress-line">
                                    Postal Code:{" "}
                                    <TextInput
                                        type="text"
                                        placeholder=""
                                        id="billingCode"
                                        value={dataBilling.postalCode}
                                        className={`inter-400-font font-size_m adress__input ${
                                            !validationError.postalCode
                                                ? ""
                                                : "input__outline-error"
                                        }`}
                                        name="postalCode"
                                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                            inputBillingAddressHandler(event, "postalCode");
                                        }}
                                        onFocus={(e: FocusEvent) => {
                                            inputOnFocusHandler(e, "postalCode");
                                        }}
                                        validationError={
                                            validationError.postalCode
                                                ? validationError.postalCode
                                                : ""
                                        }
                                    />
                                </div>
                            </>
                        ) : (
                            <>
                                <div>{dataBilling.country}</div>
                                <div>{dataBilling.city}</div>
                                <div>{dataBilling.streetName}</div>
                                <div>{dataBilling.postalCode}</div>
                            </>
                        )}
                        <div className="default-address">
                            <Text classes={["inter-400-font", "font-size_s", "color_grey-dark"]}>
                                Make as default billing address
                            </Text>
                            <input
                                name="defaultBillingAddress"
                                type="checkbox"
                                checked={defaultBillingAddress}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    setDefaultBillingAddress(e.target.checked);
                                    setActualBillingAdressAPI();
                                }}
                            />
                        </div>
                    </div>
                </div>
            </form>
            <form className="adressBilling__form" onSubmit={onShippingAdressSubmit}>
                <div className="adresses">
                    <div className={`billing ${!editShipping ? "adress" : "adress-edit"}`}>
                        <div className="adress-tittle">
                            <Text classes={["inter-600-font", "font-size_m", "color_blue-dark"]}>
                                Shipping address:
                            </Text>
                            {editShipping ? (
                                <button type="submit" className="save-button">
                                    <Text classes={["inter-600-font", "font-size_m"]}>Save</Text>
                                </button>
                            ) : (
                                <EditButton
                                    onClick={() => {
                                        setEditShipping(!editShipping);
                                    }}
                                />
                            )}
                        </div>
                        {editShipping ? (
                            <>
                                <div className="adress-line">
                                    Country:{" "}
                                    <select
                                        value={dataShipping.country}
                                        className="inter-400-font font-size_m adress__input address-form__select"
                                        name="country"
                                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                                            const { value } = e.target;
                                            setdataShipping((prevState) => ({
                                                ...prevState,
                                                country: value,
                                            }));
                                        }}
                                    >
                                        <option value="US">USA</option>
                                        <option value="RU">Russia</option>
                                        <option value="BE">Belarus</option>
                                    </select>
                                    <TextValidationError
                                        errorMessage={validationErrorShipping.country}
                                    />
                                </div>
                                <div className="adress-line">
                                    City:{" "}
                                    <TextInput
                                        type="text"
                                        placeholder=""
                                        value={dataShipping.city}
                                        className={`inter-400-font font-size_m adress__input ${
                                            !validationErrorShipping.city
                                                ? ""
                                                : "input__outline-error"
                                        }`}
                                        name="city"
                                        id="shippingCity"
                                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                            inputShippingAddressHandler(event, "city");
                                        }}
                                        onFocus={(e: FocusEvent) => {
                                            inputShippingOnFocusHandler(e, "city");
                                        }}
                                        validationError={
                                            validationErrorShipping.city
                                                ? validationErrorShipping.city
                                                : ""
                                        }
                                    />
                                </div>
                                <div className="adress-line">
                                    Street:{" "}
                                    <TextInput
                                        type="text"
                                        placeholder=""
                                        id="shippingStreet"
                                        value={dataShipping.streetName}
                                        className={`inter-400-font font-size_m adress__input ${
                                            !validationErrorShipping.streetName
                                                ? ""
                                                : "input__outline-error"
                                        }`}
                                        name="streetName"
                                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                            inputShippingAddressHandler(event, "streetName");
                                        }}
                                        onFocus={(e: FocusEvent) => {
                                            inputShippingOnFocusHandler(e, "streetName");
                                        }}
                                        validationError={
                                            validationErrorShipping.streetName
                                                ? validationErrorShipping.streetName
                                                : ""
                                        }
                                    />
                                </div>
                                <div className="adress-line">
                                    Postal Code:{" "}
                                    <TextInput
                                        type="text"
                                        placeholder=""
                                        id="shippingCode"
                                        value={dataShipping.postalCode}
                                        className={`inter-400-font font-size_m adress__input ${
                                            !validationErrorShipping.postalCode
                                                ? ""
                                                : "input__outline-error"
                                        }`}
                                        name="postalCode"
                                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                            inputShippingAddressHandler(event, "postalCode");
                                        }}
                                        onFocus={(e: FocusEvent) => {
                                            inputShippingOnFocusHandler(e, "postalCode");
                                        }}
                                        validationError={
                                            validationErrorShipping.postalCode
                                                ? validationErrorShipping.postalCode
                                                : ""
                                        }
                                    />
                                </div>
                            </>
                        ) : (
                            <>
                                <div>{dataShipping.country}</div>
                                <div>{dataShipping.city}</div>
                                <div>{dataShipping.streetName}</div>
                                <div>{dataShipping.postalCode}</div>
                            </>
                        )}
                        <div className="default-address">
                            <Text classes={["inter-400-font", "font-size_s", "color_grey-dark"]}>
                                Make as default shipping address
                            </Text>
                            <input
                                name="defaultshippingAddress"
                                type="checkbox"
                                checked={defaultShippingAddress}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    setDefaultShippingAddress(e.target.checked);
                                    setActualShippingAdressAPI();
                                }}
                            />
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}
