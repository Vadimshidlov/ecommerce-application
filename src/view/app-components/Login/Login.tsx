/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
// import "commonStyles/styles.css";
import * as yup from "yup";
import { userScheme } from "shared/utils/Validations";

export type UserFormDataType = {
    name: string;
    email: string;
};

export default function Login() {
    return (
        <section className="registration__block">
            <form className="register__form" onSubmit={registerUser}>
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
