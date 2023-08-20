import React from "react";
import "view/app-components/MainPage/style.scss";
import "react-toastify/dist/ReactToastify.css";

export default function MainPage() {
    return (
        <div className="main-page">
            <div className="main-part">
                {/* some content start */}
                <h2 style={{ textAlign: "center" }}>MainPage</h2>
                <div className="some-contant" style={{ maxWidth: "40%", marginLeft: "3rem" }}>
                    <h4>New Arrivals</h4>
                    <h3>Create your dream shop instantly.</h3>
                    <p>
                        Keep your everyday style chic and on-trend with our selection 20+ styles to
                        choose from.
                    </p>
                    <button type="button">See Collection</button>
                    {/* some content end */}
                </div>
            </div>
        </div>
    );
}
