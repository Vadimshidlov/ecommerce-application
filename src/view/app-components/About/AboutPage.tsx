/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
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

function AboutPage() {
    const [people, setPeople] = useState([
        { id: 1, name: "verv", image: "servev" },
        { id: 2, name: "sbrtb", image: "2222v" },
        { id: 3, name: "NAME333", image: "3IMAGEv33" },
    ]);

    return (
        <div className="about-container">
            <div className="team-container">
                {people.map((person) => (
                    <PersonItem {...person} />
                ))}
            </div>
            <Link to="https://rs.school" target="_blank">
                <ReactLogo className="rs-logo" width="200" />
            </Link>
        </div>
    );
}

export default AboutPage;
