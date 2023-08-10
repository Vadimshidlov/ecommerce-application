import React from "react";
import Header from "view/app-components/Header/Header";
import Text from "view/app-components/Text/text";

function App() {
    return (
        <div>
            <Header />
            <h1>Hello,React!!!!</h1>
            <Text classes={["example", "dark", "ff-primary", "fz-5rem", "fw-500"]}>
                text with classes
            </Text>
        </div>
    );
}

export default App;
