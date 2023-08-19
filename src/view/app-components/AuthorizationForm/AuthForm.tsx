import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import LoginService from "service/LoginService/LoginService";
import { Button } from "shared/components/button/Button";
import { ButtonIcon } from "shared/components/ButtonIcon/ButtonIcon";
import { TextInput } from "shared/components/TextInput/TextInput";
import closedEye from "assets/svg/closedEye.svg";
import openEye from "assets/svg/openEye.svg";
import { AxiosError } from "axios";

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

    const schema = Yup.object({
        email: Yup.string()
            .email("Email must be in the format user@example.com")
            .required("Email is a required field"),
        password: Yup.string()
            .matches(
                /(?=.*[!@#$%^&-])/,
                "The password must contain at least one special character (for example, !@#$%^&-)",
            )
            .matches(/(?=.*[A-Z])/, "The password must be received for one capital letter (AZ)")
            .matches(/(?=.*[a-z])/, "Password must contain at least one lowercase letter (az)")
            .matches(/(?=.*\d)/, "Password must contain at least one number (0-9)")
            .min(8, "Password must contain at least 8 characters")
            .required("Password is a required field"),
    });

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        try {
            await schema.validate({ email, password }, { abortEarly: false });

            await LOGIN_SERVICE.getAuthToken({ email, password });
            await LOGIN_SERVICE.authenticateCustomer({ email, password });

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
                setEmailError(error.response.data.message);
                setPassError(error.response.data.message);
            }
        }
    };

    return (
        <form className="login-form" onSubmit={handleSubmit}>
            <div className="input-container">
                <TextInput
                    name="email"
                    placeHolder="email"
                    value={email}
                    id="email"
                    type="text"
                    className="registration__input"
                    onInput={() => setEmailError("")}
                    onChange={(event) => setEmail(event.target.value)}
                />
                <label htmlFor="email" className="error-message">
                    {emailError}
                </label>
            </div>
            <div className="input-container">
                <div className="password-wrapper">
                    <TextInput
                        name="password"
                        placeHolder="password"
                        value={password}
                        id="password"
                        type={inputType}
                        className="registration__input btn-full-width"
                        onInput={() => setPassError("")}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                    <ButtonIcon
                        url={inputType === "password" ? closedEye : openEye}
                        altText="icon-eye"
                        classes="button-icon"
                        onClick={toggleHideButton}
                    />
                </div>
                <label htmlFor="password" className="error-message">
                    {passError}
                </label>
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
