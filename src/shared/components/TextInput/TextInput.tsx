import React from "react";
import TextValidationError from "view/app-components/Registration/components/ErrorsComponents/TextValidationError";

export interface ITextInput extends React.ComponentPropsWithRef<"input"> {
    validationError: string;
}

export function TextInput({ validationError, ...rest }: ITextInput) {
    return (
        <div>
            <input
                className={`inter-400-font font-size_m registration__input ${
                    !validationError ? "" : "input__outline-error"
                }`}
                {...rest}
            />
            <TextValidationError errorMessage={validationError} />
        </div>
    );
}
