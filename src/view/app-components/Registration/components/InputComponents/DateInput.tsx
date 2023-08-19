import React, { FocusEvent } from "react";

export interface IDateInput {
    name: string;
    value: string;
    id: string;
    className: string;
    onChangeHandler: (e: React.ChangeEvent<HTMLInputElement>, key: string) => void;
    onFocusHandler: (e: FocusEvent, key: string) => void;
}

export function DateInput({
    name,
    value,
    id,
    className,
    onChangeHandler,
    onFocusHandler,
}: IDateInput) {
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
                type="date"
                name={name}
                id={id}
                value={value}
            />
        </label>
    );
}
