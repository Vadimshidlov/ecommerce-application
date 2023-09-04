import React from "react";
import Text from "shared/components/Text/text";

interface IPageHeading {
    navigation: string;
    title: string;
    description: string;
}

export default function PageHeading({ navigation, title, description }: IPageHeading) {
    return (
        <div className="page__header">
            <Text classes={["inter-400-font", "font-size_l", "color_blue-dark"]}>{navigation}</Text>
            <Text classes={["space-grotesk-500-font", "font-size_heading-3", "color_black"]}>
                {title}
            </Text>
            <Text
                classes={["inter-400-font", "font-size_l", "color_blue-dark", "page__description"]}
            >
                {description}
            </Text>
        </div>
    );
}
