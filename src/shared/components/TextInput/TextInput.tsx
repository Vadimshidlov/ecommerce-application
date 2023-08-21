import React from "react";
import TextValidationError from "view/app-components/Registration/components/ErrorsComponents/TextValidationError";

export interface ITextInput extends React.ComponentPropsWithRef<"input"> {
    name: string;
    placeHolder: string;
    value: string;
    id: string;
    type: string;
    className: string;
    validationError: string;
}

export function TextInput({
    name,
    placeHolder = "",
    type = "text",
    value,
    id,
    className,
    validationError,
    ...rest
}: ITextInput) {
    return (
        <div>
            <input
                className={`inter-400-font font-size_m ${className}`}
                type={type}
                name={name}
                id={id}
                value={value}
                placeholder={placeHolder}
                {...rest}
            />
            <TextValidationError errorMessage={validationError} />
        </div>
    );
}
