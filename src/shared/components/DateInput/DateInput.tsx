import React from "react";
import TextValidationError from "view/app-components/Registration/components/ErrorsComponents/TextValidationError";

export interface IDateInput extends React.ComponentPropsWithRef<"input"> {
    validationError: string;
}

export function DateInput({ validationError, ...rest }: IDateInput) {
    return (
        <div className="date-input__component">
            <input
                className={`registration__birthday-date inter-400-font font-size_m color_grey-dark ${
                    !validationError ? "" : "input__outline-error"
                }`}
                type="date"
                {...rest}
            />
            <TextValidationError errorMessage={validationError} />
        </div>
    );
}
