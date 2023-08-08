import React from "react";
import RegistrationButton from "view/app-components/Registration/components/RegistationButton";

function RegistrationPage() {
    return (
        <section className="registration__block">
            <h2 className="registration__title">Sign up</h2>
            <form action="registration__form">
                <RegistrationButton className="registration__button" buttonText="Registration" />
            </form>
        </section>
    );
}

export default RegistrationPage;
