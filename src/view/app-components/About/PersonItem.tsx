/* eslint-disable react/destructuring-assignment */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { ReactComponent as GithubLogo } from "assets/svg/github-mark.svg";
import { Link } from "react-router-dom";

type Props = {
    name: string;
    image: string;
};

function PersonItem(props: Props) {
    console.log(props);

    return (
        <div className="person">
            <div>Image{props.image}</div>
            <div>Name{props.name}</div>
            <div>Role</div>
            <div>Bio</div>
            <GithubLogo className="github-logo" />
        </div>
    );
}

export default PersonItem;
