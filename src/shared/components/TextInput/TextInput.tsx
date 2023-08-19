import React from "react";

export interface ITextInput extends React.ComponentPropsWithRef<"input"> {
    name: string;
    placeHolder: string;
    value: string;
    id: string;
    type: string;
    className: string;
}

export function TextInput({
    name,
    placeHolder = "",
    type = "text",
    value,
    id,
    className,
    ...rest
}: ITextInput) {
    return (
        <input
            className={className}
            type={type}
            name={name}
            id={id}
            value={value}
            placeholder={placeHolder}
            {...rest}
        />
    );
}
