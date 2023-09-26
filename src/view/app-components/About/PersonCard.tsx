import React from "react";
import Text from "shared/components/Text/text";

import { ReactComponent as GithubLogo } from "assets/svg/github-mark.svg";
import { Link } from "react-router-dom";

type PersonType = {
    name: string;
    image: string;
    role: string;
    nickname: string;
    develop: string;
    description: string;
};

export function PersonCard({ name, image, role, nickname, description, develop }: PersonType) {
    return (
        <div className="about__item">
            <img src={image} alt="logo" className="about__item-img" />
            <div className="about__item-text">
                <Text classes={["space-grotesk-500-font", "font-size_heading-6", "color_black"]}>
                    {`${name}`}
                </Text>
                <Text classes={["inter-400-font", "font-size_m", "color_black"]}>
                    {`Role: ${role}`}
                </Text>
                <Text classes={["inter-400-font", "font-size_m", "color_black"]}>
                    {`Develop: ${develop}`}
                </Text>
                <Link to={`https://github.com/${nickname}`}>
                    <GithubLogo className="github-logo" />
                </Link>
                <Text classes={["inter-400-font", "font-size_m", "color_black"]}>
                    {description}
                </Text>
            </div>
        </div>
    );
}
