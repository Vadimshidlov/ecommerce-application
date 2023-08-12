import React from "react";

export type ITextValidationError = {
    errorMessage: string;
};

function TextValidationError({ errorMessage }: ITextValidationError) {
    return errorMessage ? <span className="registration__error">{errorMessage}</span> : null;
}

export default TextValidationError;
