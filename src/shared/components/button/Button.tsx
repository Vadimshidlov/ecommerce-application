import React from "react";

interface IButton {
    text: string;
    fontSize: string;
    callback: () => void;
}

export function Button({ text, fontSize, callback }: IButton) {
    return (
        <button type="button" className={`button ${fontSize}`} onClick={callback}>
            {text}
        </button>
    );
}
