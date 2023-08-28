import React, { FocusEvent } from "react";
import TextValidationError from "view/app-components/Registration/components/ErrorsComponents/TextValidationError";

export interface IDateInput {
    name: string;
    value: string;
    id: string;
    className: string;
    validationError: string;
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
    validationError,
}: IDateInput) {
    return (
        <div className="date-input__component">
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
            <TextValidationError errorMessage={validationError} />
        </div>
    );
}
