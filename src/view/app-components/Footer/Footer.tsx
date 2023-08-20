import React from "react";
import { LogoLink } from "view/app-components/Header/LogoLink/LogoLink";
import Text from "view/app-components/Text/text";

export default function Footer() {
    return (
        <div className="footer">
            <LogoLink />
            <Text classes={["inter-400-font ", "font-size_m"]}>
                Phosfluorescently engage worldwide method process shopping.
            </Text>
        </div>
    );
}
