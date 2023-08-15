import React from "react";

interface IButtonIcon extends React.ComponentPropsWithRef<"button"> {
    url: string;
    altText: string;
    classes: string;
}

export function ButtonIcon({ url, altText, classes, ...rest }: IButtonIcon) {
    return (
        <button type="button" className={classes} {...rest}>
            <img src={url} alt={altText} />
        </button>
    );
}
