import React from "react";

export function PasswordError(passwordError: string) {
    const message = passwordError;
    const lengthMessage = message.length;
    const symbolsString = "Symbols: ~\\`!@#$%^&*()_-+={[}]|\\\\:;\"'<,>.?/";

    return lengthMessage > 28 ? (
        <span>
            Passwords should contain three of the four character types: <br />
            Uppercase letters: A-Z, <br />
            Lowercase letters: a-z, <br />
            Numbers: 0-9, <br />
            {symbolsString} <br />
        </span>
    ) : (
        <span>{message}</span>
    );
}
