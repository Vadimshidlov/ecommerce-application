import React from "react";
import Text from "shared/components/Text/text";

interface IButton extends React.ComponentPropsWithRef<"button"> {
    text: string;
    textClasses: string[];
    buttonClasses: string;
}

export function Button({ type = "button", text, textClasses, buttonClasses, ...rest }: IButton) {
    return (
        <button type={type} className={buttonClasses} {...rest}>
            <Text classes={textClasses}>{text}</Text>
        </button>
    );
}
