import React from "react";
import "view/app-components/About/style.scss";
import { ReactComponent as ReactLogo } from "assets/svg/rs_school.svg";
import { Link } from "react-router-dom";
import PersonItem from "view/app-components/About/PersonItem";

enum Person {
    Vadim = "Vadimshidlov",
    Maxim = "vulGUN",
    Vitali = "vitali007tut",
}

function AboutPage() {
    const people = [
        {
            id: 1,
            name: "Vadim",
            image: "https://avatars.githubusercontent.com/u/82110760?v=4",
            role: "lead-developer",
            nickname: Person.Vadim,
            description: "",
        },
        {
            id: 2,
            name: "Maxim",
            image: "https://avatars.githubusercontent.com/u/94137961?v=4",
            role: "developer",
            nickname: Person.Maxim,
            description: "",
        },
        {
            id: 3,
            name: "Vitali",
            image: "https://avatars.githubusercontent.com/u/61989351?v=4",
            role: "developer",
            nickname: Person.Vitali,
            description: "",
        },
    ];

    return (
        <div className="about-container">
            <div className="team-container">
                {people.map((person) => (
                    <PersonItem {...person} key={person.id} />
                ))}
            </div>
            <Link to="https://rs.school" target="_blank">
                <ReactLogo className="rs-logo" width="200" />
            </Link>
        </div>
    );
}

export default AboutPage;
