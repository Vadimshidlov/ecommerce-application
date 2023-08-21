import React from "react";

export type ITextValidationError = {
    errorMessage: string;
};

function TextValidationError({ errorMessage }: ITextValidationError) {
    return errorMessage ? (
        <span className="registration__error inter-400-font font-size_xs">{errorMessage}</span>
    ) : null;
}

export default TextValidationError;
