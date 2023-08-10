import React from "react";

// type PropsType = {
//     children: string;
//     color: string;
//     fontFamily: string;
//     fontSize: string;
//     fontWeight: string;
// };

// export default function Text({ children, color, fontFamily, fontSize, fontWeight }: PropsType) {
//     return <span style={{ color, fontFamily, fontSize, fontWeight }}>{children}</span>;
// }

type PropsType = {
    children: string;
    classes: string[];
};

export default function Text({ children, classes }: PropsType) {
    return <span className={classes.join(" ")}>{children}</span>;
}
