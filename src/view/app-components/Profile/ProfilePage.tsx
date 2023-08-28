import React, { useEffect } from "react";
import { useAuth } from "auth-context";
import { useNavigate, Outlet, Navigate } from "react-router-dom";
import Navbar from "view/app-components/Profile/Navbar";
import Text from "view/app-components/Text/text";
import "view/app-components/Profile/style.scss";

export default function ProfilePage() {
    const navigate = useNavigate();
    const { isAuth } = useAuth();

    if (!isAuth) {
        return <Navigate to="/" />;
    }

    // eslint-disable-next-line react-hooks/rules-of-hooks, react-hooks/exhaustive-deps
    useEffect(() => navigate("/profile/adresses"), []);

    return (
        <div>
            <Text
                classes={[
                    "profile-tittle",
                    "space-grotesk-500-font",
                    "font-size_heading-3",
                    "color_black",
                ]}
            >
                My profile
            </Text>
            <div className="profile-container">
                <Navbar />
                <Outlet />
            </div>
        </div>
    );
}
