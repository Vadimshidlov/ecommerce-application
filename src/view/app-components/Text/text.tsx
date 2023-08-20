import React from "react";

type PropsType = {
    children: string;
    classes: string[];
};

export default function Text({ children: text, classes }: PropsType) {
    return <span className={classes.join(" ")}>{text}</span>;
}
