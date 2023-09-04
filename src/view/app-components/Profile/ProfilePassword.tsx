import React, { FocusEvent, useEffect, useRef, useState } from "react";
import * as yup from "yup";
import { ValidationError } from "yup";
import { Button } from "shared/components/button/Button";
import "view/app-components/Profile/style.scss";
import closedEye from "assets/svg/closedEye.svg";
import openEye from "assets/svg/openEye.svg";
import { TextInput } from "shared/components/TextInput/TextInput";
import { ChangePasswordType, getEmail } from "view/app-components/Profile/profile-utils";
import { getValidationErrorsPassword } from "shared/utils/getValidationErrorsPassword";
import { errorPasswordMessage } from "shared/utils/notifyMessages";
import { ButtonIcon } from "shared/components/ButtonIcon/ButtonIcon";
import { changePasswordProfile } from "view/app-components/Profile/axiosProfile";
import LoginService from "service/LoginService/LoginService";
import { LoginStore } from "service/LoginStore/LoginStore";
import { AuthDataStore } from "service/AuthDataStore/AuthDataStore";

const getInitialPasswords = (): ChangePasswordType => ({
    currentPassword: "",
    newPassword: "",
});

export default function ProfilePassword() {
    const [data, setData] = useState<ChangePasswordType>(getInitialPasswords());
    const [email, setEmail] = useState<string>("");
    const [validationError, setValidationError] = useState<ChangePasswordType>(
        getInitialPasswords(),
    );
    const [inputTypeOld, setInputTypeOld] = useState<string>("password");
    const [inputTypeNew, setInputTypeNew] = useState<string>("password");
    const loginService = useRef(new LoginService());
    const loginStore = LoginStore.getLoginStore();
    const authDataStore = AuthDataStore.getAuthDataStore();

    useEffect(() => {
        const fetchData = async () => {
            const emailAPI = await getEmail();
            setEmail(emailAPI);
        };
        fetchData();
    }, []);

    const toggleHideButtonOld = (): void => {
        setInputTypeOld(inputTypeOld === "password" ? "text" : "password");
    };

    const toggleHideButtonNew = (): void => {
        setInputTypeNew(inputTypeNew === "password" ? "text" : "password");
    };

    const passwordScheme = yup.object({
        currentPassword: yup.string().required("Password is a required field"),
        newPassword: yup
            .string()
            .required("Password is a required field")
            .min(8, "Password must contain at least 8 characters")
            .matches(/(?=.[A-Z])/, "The password must be received for one capital letter (AZ)")
            .matches(/(?=.[a-z])/, "Password must contain at least one lowercase letter (az)")
            .matches(/(?=.\d)/, "Password must contain at least one number (0-9)")
            .matches(/^[^\s]*$/, "Password must not contain a space")
            .matches(
                /(?=.[!@#$%^&-])/,
                "The password must contain at least one special character (for example, !@#$%^&-)",
            ),
    });

    const inputPasswordHandler = async (
        e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>,
        key: keyof ChangePasswordType,
    ) => {
        const { value } = e.target;

        setData({ ...data, [key]: value });
    };

    const inputPasswordOnFocusHandler = (e: FocusEvent, key: string) => {
        setValidationError({ ...validationError, [key]: "" });
    };

    const onPasswordSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            await passwordScheme.validate(data, { abortEarly: false });
            await changePasswordProfile(data);

            authDataStore.removeTokenFromStore("accessAuthToken");
            authDataStore.removeTokenFromStore("refreshAuthToken");
            await loginService.current.getAuthToken({ email, password: data.newPassword });
            loginStore.setAuthStatus(true);
            await loginService.current.authenticateCustomer({ email, password: data.newPassword });
            setData(getInitialPasswords());
        } catch (err) {
            if (err instanceof ValidationError) {
                const errorsList = [...err.inner];
                setValidationError((prevState) => ({
                    ...prevState,
                    ...getValidationErrorsPassword(errorsList),
                }));
            } else {
                errorPasswordMessage();
            }
        }
    };

    return (
        <form className="password" onSubmit={onPasswordSubmit}>
            Current password:
            <div className="password__wrapper">
                <TextInput
                    type={inputTypeOld}
                    name="currentPassword"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        inputPasswordHandler(e, "currentPassword")
                    }
                    onFocus={(e: FocusEvent) => {
                        inputPasswordOnFocusHandler(e, "currentPassword");
                    }}
                    className={`registration__input ${
                        !validationError.currentPassword ? "" : "input__outline-error"
                    }`}
                    id="currentPassword"
                    value={data.currentPassword}
                    placeholder="type password..."
                    validationError={
                        validationError.currentPassword ? validationError.currentPassword : ""
                    }
                />
                <ButtonIcon
                    url={inputTypeOld === "password" ? closedEye : openEye}
                    altText="icon-eye"
                    classes="button-icon"
                    onClick={toggleHideButtonOld}
                />
            </div>
            New password:
            <div className="password__wrapper">
                <TextInput
                    type={inputTypeNew}
                    name="newPassword"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        inputPasswordHandler(e, "newPassword")
                    }
                    onFocus={(e: FocusEvent) => {
                        inputPasswordOnFocusHandler(e, "newPassword");
                    }}
                    className={`registration__input ${
                        !validationError.newPassword ? "" : "input__outline-error"
                    }`}
                    id="newPassword"
                    value={data.newPassword}
                    placeholder="type password..."
                    validationError={validationError.newPassword ? validationError.newPassword : ""}
                />
                <ButtonIcon
                    url={inputTypeNew === "password" ? closedEye : openEye}
                    altText="icon-eye"
                    classes="button-icon"
                    onClick={toggleHideButtonNew}
                />
            </div>
            <Button
                type="submit"
                text="Change password"
                textClasses={["space-grotesk-500-font", "font-size_2xl", "color_white"]}
                buttonClasses="button"
            />
        </form>
    );
}
