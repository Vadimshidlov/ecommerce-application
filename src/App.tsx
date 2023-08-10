import React from "react";
import MainPage from "view/app-components/MainPage/mainPage";
import Text from "view/app-components/Text/text";

function App() {
    return (
        <div>
            <MainPage />
            <h1>Hello,React!!!!</h1>
            <Text classes={["example", "dark", "ff-primary", "fz-5rem", "fw-500"]}>
                text with classes
            </Text>
        </div>
    );
}

export default App;
