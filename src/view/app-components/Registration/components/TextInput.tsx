import React, { FocusEvent } from "react";

export interface ITextInput {
    name: string;
    placeHolder: string;
    value: string;
    id: string;
    type: string;
    className: string;
    onChangeHandler: (e: React.ChangeEvent<HTMLInputElement>, key: string) => void;
    onFocusHandler: (e: FocusEvent, key: string) => void;
}

export function TextInput({
    name,
    placeHolder = "",
    type = "text",
    value,
    id,
    className,
    onChangeHandler,
    onFocusHandler,
}: ITextInput) {
    return (
        <label htmlFor={name}>
            <input
                onChange={(e) => {
                    onChangeHandler(e, name);
                }}
                onFocus={(e: FocusEvent) => {
                    onFocusHandler(e, name);
                }}
                className={className}
                type={type}
                name={name}
                id={id}
                value={value}
                placeholder={placeHolder}
            />
        </label>
    );
}
