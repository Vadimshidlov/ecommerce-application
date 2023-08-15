import React, { useState } from "react";
import * as Yup from "yup";
import LoginService from "service/LoginService/LoginService";
import { Button } from "shared/components/button/Button";
import { ButtonIcon } from "shared/components/ButtonIcon/ButtonIcon";
import { TextInput } from "shared/components/TextInput/TextInput";
import closedEye from "assets/svg/closedEye.svg";
import openEye from "assets/svg/openEye.svg";

export function AuthForm() {
    const LOGIN_SERVICE = new LoginService();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passError, setPassError] = useState("");
    const [inputType, setInputType] = useState("password");

    const toggleHideButton = () => {
        setInputType(inputType === "password" ? "text" : "password");
    };

    const schema = Yup.object({
        email: Yup.string()
            .email("Email must be in the format user@example.com")
            .required("Email is a required field"),
        password: Yup.string()
            .matches(/(?=.*[A-Z])/, "The password must be received for one capital letter (AZ)")
            .matches(/(?=.*[a-z])/, "Password must contain at least one lowercase letter (az)")
            .matches(/(?=.*\d)/, "Password must contain at least one number (0-9)")
            .matches(
                /(?=.*[!@#$%^&-])/,
                "The password must contain at least one special character (for example, !@#$%^&-)",
            )
            .min(8, "Password must contain at least 8 characters")
            .required("Password is a required field"),
    });

    const handleSubmit = async (event: React.FormEvent): Promise<void> => {
        event.preventDefault();

        try {
            await schema.validate({ email, password }, { abortEarly: false });

            LOGIN_SERVICE.getAuthToken({ email, password }).then(() =>
                LOGIN_SERVICE.authenticateCustomer({ email, password }),
            );
        } catch (error) {
            if (error instanceof Yup.ValidationError) {
                error.inner.forEach((err) => {
                    if (err.path === "email") {
                        setEmailError(err.message);
                    } else {
                        setPassError(err.message);
                    }
                });
                console.error("error~~", error);
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
