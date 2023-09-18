/* eslint-disable react/destructuring-assignment */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { ReactComponent as GithubLogo } from "assets/svg/github-mark.svg";
import { Link } from "react-router-dom";
import { Person } from "view/app-components/About/about-utils";

type PersonType = {
    name: string;
    image: string;
    role: string;
    nickname: string;
    description: string;
};

function PersonItem(props: PersonType) {
    console.log(props);

    return (
        <div className="person">
            <img className="avatar" src={`${props.image}`} alt="" />
            <strong>{props.name}</strong>
            <div>
                <strong>Role:</strong> {props.role}
            </div>
            <div className="develop_line">
                <strong>Develop:</strong> {props.description}
            </div>
            <Link to={`https://github.com/${props.nickname}`}>
                <GithubLogo className="github-logo" />
            </Link>
        </div>
    );
}

export default PersonItem;
