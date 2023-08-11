import React from "react";

interface IButtonProps extends React.ComponentPropsWithRef<"button"> {
    className: string;
    buttonText: string;
}

function RegistrationButton({ className, buttonText }: IButtonProps) {
    return (
        <button type="submit" className={className}>
            {buttonText}
        </button>
    );
}

export default RegistrationButton;
