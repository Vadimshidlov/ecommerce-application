/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import "view/app-components/About/style.scss";
import { ReactComponent as ReactLogo } from "assets/svg/rs_school.svg";
import { ReactComponent as GithubLogo } from "assets/svg/github-mark.svg";
import { Link } from "react-router-dom";
import PersonItem from "view/app-components/About/PersonItem";

enum Person {
    Vadim = "Vadimshidlov",
    Max = "vulGUN",
    Vitali = "vitali007tut",
}

export default function AboutPage() {
    return (
        <div className="about-container">
            <PersonItem />
            <div>AboutPage</div>
            <GithubLogo className="github-logo" />
            <Link to="https://rs.school" target="_blank">
                <ReactLogo className="rs-logo" width="200" />
            </Link>
        </div>
    );
}
