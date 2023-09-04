import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Button } from "shared/components/button/Button";
import { ButtonIcon } from "shared/components/ButtonIcon/ButtonIcon";
import { TextInput } from "shared/components/TextInput/TextInput";
import closedEye from "assets/svg/closedEye.svg";
import openEye from "assets/svg/openEye.svg";
import { AxiosError } from "axios";
import { useAuth } from "auth-context";
import {
    errorAuthorizationMessage,
    successAuthorizationMessage,
} from "shared/utils/notifyMessages";
import { LoginStore } from "service/LoginStore/LoginStore";
import LoginService from "service/LoginService/LoginService";

export function AuthForm() {
    const LOGIN_SERVICE: LoginService = new LoginService();

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [emailError, setEmailError] = useState<string>("");
    const [passError, setPassError] = useState<string>("");
    const [inputType, setInputType] = useState<string>("password");

    const toggleHideButton = (): void => {
        setInputType(inputType === "password" ? "text" : "password");
    };

    const navigate = useNavigate();
    const { setIsAuth } = useAuth();

    const schema = Yup.object({
        email: Yup.string()
            .email("Email must be in the format user@example.com")
            .matches(
                /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                "Email must be in the format user@example.com",
            )
            .matches(/^[^\s]*$/, "Email must not contain a space")
            .required("Email is a required field"),
        password: Yup.string()
            .matches(
                /(?=.*[!@#$%^&-])/,
                "The password must contain at least one special character (for example, !@#$%^&-)",
            )
            .matches(/(?=.*[A-Z])/, "The password must be received for one capital letter (AZ)")
            .matches(/(?=.*[a-z])/, "Password must contain at least one lowercase letter (az)")
            .matches(/(?=.*\d)/, "Password must contain at least one number (0-9)")
            .matches(/^[^\s]*$/, "Password must not contain a space")
            .min(8, "Password must contain at least 8 characters")
            .required("Password is a required field"),
    });

    const loginStore = LoginStore.getLoginStore();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        try {
            await schema.validate({ email, password }, { abortEarly: false });

            await LOGIN_SERVICE.getAuthToken({ email, password });

            await LOGIN_SERVICE.authenticateCustomer({ email, password });

            successAuthorizationMessage();
            setIsAuth(true);

            loginStore.setAuthStatus(true);

            navigate("/");
        } catch (error) {
            if (error instanceof Yup.ValidationError) {
                error.inner.forEach((err) => {
                    if (err.path === "email") {
                        setEmailError(err.message);
                    } else {
                        setPassError(err.message);
                    }
                });
            } else if (error instanceof AxiosError && error.response?.status === 400) {
                errorAuthorizationMessage();
            }
        }
    };

    return (
        <form className="login__form" onSubmit={handleSubmit}>
            <div className="input__container">
                <TextInput
                    name="email"
                    placeholder="email"
                    value={email}
                    id="email"
                    type="text"
                    className={`registration__input ${!emailError ? "" : "input__outline-error"}`}
                    onInput={(event) => {
                        setEmail((event.target as HTMLInputElement).value);
                    }}
                    onFocus={() => setEmailError("")}
                    onChange={(event) => setEmail(event.target.value)}
                    validationError={emailError || ""}
                />
            </div>
            <div className="input__container">
                <div className="password__wrapper">
                    <TextInput
                        name="password"
                        placeholder="password"
                        value={password}
                        id="password"
                        type={inputType}
                        className={`registration__input ${
                            !passError ? "" : "input__outline-error"
                        }`}
                        onInput={() => setPassError("")}
                        onFocus={() => setPassError("")}
                        onChange={(event) => setPassword(event.target.value)}
                        validationError={passError || ""}
                    />
                    <ButtonIcon
                        url={inputType === "password" ? closedEye : openEye}
                        altText="icon-eye"
                        classes="button-icon"
                        onClick={toggleHideButton}
                    />
                </div>
            </div>
            <Button
                type="submit"
                text="Sign in"
                textClasses={["space-grotesk-500-font", "font-size_2xl", "color_white"]}
                buttonClasses="button btn-full-width"
            />
        </form>
    );
}
