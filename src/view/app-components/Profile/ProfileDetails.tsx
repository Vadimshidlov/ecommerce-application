import React, { FocusEvent, useEffect, useState } from "react";
import * as yup from "yup";
import { ValidationError } from "yup";
import "view/app-components/Profile/style.scss";
import { DetailsType, getProfileDetails } from "view/app-components/Profile/profile-utils";
import { maxValidBirthdayDate } from "shared/utils/getInitialFormData";
import EditButton from "view/app-components/Profile/EditButton";
import Text from "view/app-components/Text/text";
import { getValidationErrorsDetails } from "shared/utils/getValidationErrorsDetails";
import { TextInput } from "shared/components/TextInput/TextInput";
import { DateInput } from "shared/components/DateInput/DateInput";
import { changeDetailsProfile } from "view/app-components/Profile/axiosProfile";
import { AxiosError } from "axios";
import { errorRegistrationMessage } from "shared/utils/notifyMessages";

const getInitialDetails = (): DetailsType => ({
    firstName: "",
    lastName: "",
    email: "",
    birthdayDate: "",
});

export default function ProfileDetails() {
    const [edit, setEdit] = useState<boolean>(false);
    const [data, setData] = useState<DetailsType>(getInitialDetails());
    const [validationError, setValidationError] = useState<DetailsType>(getInitialDetails());

    const detailsScheme = yup.object({
        firstName: yup
            .string()
            .required("Firstname is required field")
            .min(1, "Very short firstname")
            .max(25, "Very large firstname")
            .matches(/^[a-zA-Zа-яА-Я]*$/, "Only letters allowed"),
        lastName: yup
            .string()
            .required("Lastname is required field")
            .min(1, "Very short lastname")
            .max(25, "Very large lastname")
            .matches(/^[a-zA-Zа-яА-Я]*$/, "Only letters allowed"),
        email: yup
            .string()
            .matches(/^[^\s]*$/, "Email must not contain a space")
            .required("Email is a required field")
            .email("Email must be in the format user@example.com")
            .matches(
                /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                "Email must be in the format user@example.com",
            ),
        birthdayDate: yup
            .date()
            .typeError("Please enter a valid date")
            .required("Date is required field")
            .max(maxValidBirthdayDate, "User must be over 13 years old"),
    });

    useEffect(() => {
        const fetchData = async () => {
            setData(await getProfileDetails());
        };
        fetchData();
    }, []);

    const detailsHandler = async (userDetails: DetailsType) => {
        try {
            await detailsScheme.validate(userDetails, { abortEarly: false });
            await changeDetailsProfile(data);
            // setEdit(!edit);
        } catch (err) {
            if (err instanceof ValidationError) {
                const errorsList = [...err.inner];
                setValidationError((prevState) => ({
                    ...prevState,
                    ...getValidationErrorsDetails(errorsList),
                }));
            }
        }
    };

    const inputDetailsHandler = async (
        e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>,
        key: keyof DetailsType,
    ) => {
        const { value } = e.target;

        setData({ ...data, [key]: value });
    };

    const inputDetailsOnFocusHandler = (e: FocusEvent, key: string) => {
        setValidationError({ ...validationError, [key]: "" });
    };

    const onDetailsSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            await detailsHandler(data);
            // setEdit(!edit);
        } catch (error) {
            // if (err instanceof ValidationError) {
            //     const errorsList = [...err.inner];
            //     setValidationError((prevState) => ({
            //         ...prevState,
            //         ...getValidationErrorsDetails(errorsList),
            //     }));
            // }
            if (error instanceof AxiosError) {
                errorRegistrationMessage();
            } else if (error instanceof Error) {
                console.log(error.message, "instanceof Error");
            }
        }
    };

    return (
        <div className="details-form">
            <form className="details__form" onSubmit={onDetailsSubmit}>
                <div className={`${!edit ? "details" : "details-edit"}`}>
                    <div className="details-tittle">
                        {edit ? (
                            <button type="submit" className="save-button">
                                <Text classes={["inter-600-font", "font-size_m"]}>Save</Text>
                            </button>
                        ) : (
                            <EditButton
                                onClick={() => {
                                    setEdit(!edit);
                                }}
                            />
                        )}
                    </div>
                    {edit ? (
                        <>
                            <div className="details-line">
                                First name:{" "}
                                <TextInput
                                    type="text"
                                    placeholder=""
                                    value={data.firstName}
                                    className={`inter-400-font font-size_m adress__input ${
                                        !validationError.firstName ? "" : "input__outline-error"
                                    }`}
                                    name="firstName"
                                    id="firstDetailsName"
                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                        inputDetailsHandler(event, "firstName");
                                    }}
                                    onFocus={(e: FocusEvent) => {
                                        inputDetailsOnFocusHandler(e, "firstName");
                                    }}
                                    validationError={
                                        validationError.firstName ? validationError.firstName : ""
                                    }
                                />
                            </div>
                            <div className="adress-line">
                                Last name:{" "}
                                <TextInput
                                    type="text"
                                    placeholder=""
                                    value={data.lastName}
                                    className={`inter-400-font font-size_m adress__input ${
                                        !validationError.lastName ? "" : "input__outline-error"
                                    }`}
                                    name="lastName"
                                    id="lastName"
                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                        inputDetailsHandler(event, "lastName");
                                    }}
                                    onFocus={(e: FocusEvent) => {
                                        inputDetailsOnFocusHandler(e, "lastName");
                                    }}
                                    validationError={
                                        validationError.lastName ? validationError.lastName : ""
                                    }
                                />
                            </div>
                            <div className="adress-line">
                                Email:{" "}
                                <TextInput
                                    type="text"
                                    placeholder=""
                                    value={data.email}
                                    className={`inter-400-font font-size_m adress__input ${
                                        !validationError.email ? "" : "input__outline-error"
                                    }`}
                                    name="email"
                                    id="email"
                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                        inputDetailsHandler(event, "email");
                                    }}
                                    onFocus={(e: FocusEvent) => {
                                        inputDetailsOnFocusHandler(e, "email");
                                    }}
                                    validationError={
                                        validationError.email ? validationError.email : ""
                                    }
                                />
                            </div>
                            <div className="adress-line">
                                Birthday date:{" "}
                                <DateInput
                                    value={data.birthdayDate}
                                    className={`birthday-date inter-400-font font-size_m adress__input ${
                                        !validationError.birthdayDate ? "" : "input__outline-error"
                                    }`}
                                    name="birthdayDate"
                                    id="birthdayDate"
                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                        inputDetailsHandler(event, "birthdayDate");
                                    }}
                                    onFocus={(e: FocusEvent) => {
                                        inputDetailsOnFocusHandler(e, "birthdayDate");
                                    }}
                                    validationError={
                                        validationError.birthdayDate
                                            ? validationError.birthdayDate
                                            : ""
                                    }
                                />
                            </div>
                        </>
                    ) : (
                        <>
                            <div>{data.firstName}</div>
                            <div>{data.lastName}</div>
                            <div>{data.email}</div>
                            <div>{data.birthdayDate}</div>
                        </>
                    )}
                </div>
            </form>
        </div>
    );
}
