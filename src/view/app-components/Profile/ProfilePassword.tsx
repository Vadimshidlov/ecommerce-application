import React from "react";
import { Button } from "shared/components/button/Button";

export default function ProfilePassword() {
    return (
        <div className="change-password">
            <div className="password-wrapper">
                Old Password
                <input type="text" />
            </div>
            <div className="password-wrapper">
                New Password
                <input type="text" />
            </div>
            <Button
                type="submit"
                text="Change password"
                textClasses={["space-grotesk-500-font", "font-size_2xl", "color_white"]}
                buttonClasses="button"
            />
        </div>
    );
}
