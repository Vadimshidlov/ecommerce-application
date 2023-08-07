/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
// import "commonStyles/styles.css";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailDirty, setEmailDirty] = useState(false);
    const [passwordDirty, setPasswordDirty] = useState(false);
    const [emailError, setEmailError] = useState("Should not be not-empty");
    const [passwordError, setPasswordError] = useState("Should not be not-empty");

    const blurHandler = (e) => {
        switch (e.target.name) {
            case "email":
                setEmailDirty(true);
                break;
            case "password":
                setPasswordDirty(true);
                break;
            default:
        }
    };

    const emailHandler = (e) => {
        setEmail(e.target.value);
    };

    const passwordHandler = (e) => {
        setPassword(e.target.value);
    };

    return (
        <section className="registration__block">
            <form className="register__form">
                <h1>Registration</h1>
                {emailDirty && emailError && <div style={{ color: "red" }}>{emailError} </div>}
                <input
                    onChange={(e) => {
                        emailHandler(e);
                    }}
                    value={email}
                    onBlur={(e) => blurHandler(e)}
                    name="email"
                    type="text"
                    placeholder="Enter your email...."
                />
                {passwordDirty && passwordError && (
                    <div style={{ color: "red" }}>{passwordError} </div>
                )}
                <input
                    onChange={(e) => {
                        passwordHandler(e);
                    }}
                    value={password}
                    onBlur={(e) => blurHandler(e)}
                    name="password"
                    type="password"
                    placeholder="Enter your password...."
                />
                <button type="submit">Registration</button>
            </form>
        </section>
    );
}
