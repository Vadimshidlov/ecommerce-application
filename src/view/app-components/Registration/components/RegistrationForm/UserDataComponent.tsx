import React, { useState } from "react";
import { ButtonIcon } from "shared/components/ButtonIcon/ButtonIcon";
import { TextInput } from "shared/components/TextInput/TextInput";
import { ISignUpForm } from "shared/utils/getInitialFormData";
import { IStateErrors } from "shared/utils/getInitialFormErrorsData";
import Text from "shared/components/Text/text";
import closedEye from "assets/svg/closedEye.svg";
import openEye from "assets/svg/openEye.svg";
import { DateInput } from "shared/components/DateInput/DateInput";

export type UserDataInputPropsType = {
    formDataProps: ISignUpForm;
    validationErrorProps: IStateErrors;
    inputTextHandler: (
        e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>,
    ) => Promise<void>;
    inputOnFocusHandler: (e: React.FocusEvent<HTMLInputElement>) => void;
};

function UserDataInput({
    formDataProps,
    validationErrorProps,
    inputTextHandler,
    inputOnFocusHandler,
}: UserDataInputPropsType) {
    const formData = formDataProps;
    const validationError = validationErrorProps;

    const [inputType, setInputType] = useState<string>("password");
    const toggleHideButton = (): void => {
        setInputType(inputType === "password" ? "text" : "password");
    };

    return (
        <div className="registration__personal-data">
            <Text classes={["inter-600-font", "font-size_m", "color_blue-dark"]}>
                Personal data:
            </Text>
            <div className="input__wrapper">
                <TextInput
                    type="text"
                    name="firstname"
                    onChange={inputTextHandler}
                    onFocus={inputOnFocusHandler}
                    id="fname"
                    value={formData.firstname}
                    placeholder="Your name"
                    validationError={validationError.firstname || ""}
                />
                <TextInput
                    type="text"
                    name="lastname"
                    onChange={inputTextHandler}
                    onFocus={inputOnFocusHandler}
                    id="lname"
                    value={formData.lastname}
                    placeholder="Your lastname"
                    validationError={validationError.lastname || ""}
                />
                <TextInput
                    type="text"
                    name="email"
                    onChange={inputTextHandler}
                    onFocus={inputOnFocusHandler}
                    id="email"
                    value={formData.email}
                    placeholder="Email address"
                    validationError={validationError.email ? validationError.email : ""}
                />
                <div className="password__wrapper">
                    <TextInput
                        type={inputType}
                        name="password"
                        onChange={inputTextHandler}
                        onFocus={inputOnFocusHandler}
                        id="password"
                        value={formData.password}
                        placeholder="Password"
                        validationError={validationError.password ? validationError.password : ""}
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
                        id="birthdayDate"
                        name="birthdayDate"
                        onChange={inputTextHandler}
                        onFocus={inputOnFocusHandler}
                        value={formData.birthdayDate}
                        validationError={
                            validationError.birthdayDate ? validationError.birthdayDate : ""
                        }
                    />
                </div>
            </div>
        </div>
    );
}

export default UserDataInput;
