import React from "react";
import "view/app-components/PageNotFound/style.scss";
import { useNavigate } from "react-router-dom";

import Header from "view/app-components/Header/Header";
import NotFoundIcon from "view/app-components/PageNotFound/notFoundIcon";
import Text from "view/app-components/Text/text";

export default function PageNotFound() {
    const paragraf = `The page you're looking for isn't available.Try to search again or use the go back button below.`;
    const navigate = useNavigate();

    return (
        <div>
            <Header />
            <div className="not-found__container">
                <NotFoundIcon />
                <Text classes={["space-grotesk-500-font", "color_black", "font-size_heading-3"]}>
                    404 – Page not found
                </Text>
                <Text classes={["inter-400-font", "color_blue-dark", "font-size_l"]}>
                    {paragraf}
                </Text>
                <button
                    type="button"
                    style={{ backgroundColor: "black", padding: "5px", cursor: "pointer" }}
                    onClick={() => navigate("/")}
                >
                    <Text classes={["space-grotesk-500-font", "color_white", "font-size_l"]}>
                        Go back home
                    </Text>
                </button>
            </div>
        </div>
    );
}
