import React from "react";
import "view/app-components/About/style.scss";
import { ReactComponent as ReactLogo } from "assets/svg/rs_school.svg";
import { Link } from "react-router-dom";
// import PersonItem from "view/app-components/About/PersonItem";
import PageHeading from "shared/components/PageHeading/PageHeading";
import Text from "shared/components/Text/text";
import { PersonCard } from "view/app-components/About/PersonCard";

enum PersonList {
    Vadim = "Vadimshidlov",
    Maxim = "vulGUN",
    Vitali = "vitali007tut",
}

function AboutPage() {
    const people = [
        {
            id: 1,
            name: "Vadim Sh.",
            image: "https://avatars.githubusercontent.com/u/82110760?v=4",
            role: "lead-developer",
            nickname: PersonList.Vadim,
            develop: "Authorization page, ecommercetools api, basket page, components, services",
            description:
                "Vadim is 25 years old, he is from Belarus, Vitebsk. He enjoys spending time with family and friends, writing code, sports, fishing and animals. Vadim has been the driving force behind this project, ensuring that all pieces come together seamlessly. His effective leadership and coordination skills have been instrumental in the successful completion of this project. You can learn more about Vadim’s work on his GitHub profile.",
        },
        {
            id: 2,
            name: "Maxim L.",
            image: "https://avatars.githubusercontent.com/u/94137961?v=4",
            role: "UX/UI designer, developer",
            nickname: PersonList.Maxim,
            develop: "Login page, products catalog, components, ecommercetools api, adaptiv styles",
            description:
                "Maxim is 29 years old, he is from Russia, Lipetsk. Maxim creative flair and attention to detail have resulted in an intuitive and aesthetically pleasing user interface. His designs have significantly enhanced the user experience on our platform. You can learn more about Maxim’s work on his GitHub profile.",
        },
        {
            id: 3,
            name: "Vitali T.",
            image: "https://avatars.githubusercontent.com/u/61989351?v=4",
            role: "developer",
            nickname: PersonList.Vitali,
            develop: "Main page, profile page, about page",
            description:
                "Vitaly is 36 years old, he is from Belarus, Minsk. Vitali’s meticulous testing and quality checks have ensured that our platform runs smoothly and efficiently. His dedication to quality has helped us deliver a bug-free shopping experience. You can learn more about Vitali’s work on his GitHub profile",
        },
    ];

    return (
        <section className="about container">
            <PageHeading
                navigation=""
                title="About us"
                description="Welcome to our About Us page! Here you will find information about the developers who created this application."
            />
            <div className="about__wrapper">
                <div className="about__begin">
                    <Text
                        classes={[
                            "space-grotesk-500-font",
                            "font-size_heading-5",
                            "color_black",
                            "about__title",
                        ]}
                    >
                        So, let`s begin
                    </Text>
                    <Text
                        classes={["inter-400-font", "font-size_l", "color_black", "welcome-text"]}
                    >
                        We are a dedicated team of developers who have come together to create an
                        exceptional online shopping experience for you on our platform, powered by
                        Ecommercetools API. Our team members, each with their unique skills and
                        contributions, have played a crucial role in building this successful
                        product.
                    </Text>
                </div>
                <div className="about__developers">
                    <Text
                        classes={[
                            "space-grotesk-500-font",
                            "font-size_heading-5",
                            "color_black",
                            "about__title",
                        ]}
                    >
                        Meet Our Team
                    </Text>
                    <div className="about__items-wrapper">
                        {people.map((person) => (
                            <PersonCard {...person} key={person.id} />
                        ))}
                    </div>
                </div>
                <div className="about__conclusion">
                    <Text
                        classes={[
                            "space-grotesk-500-font",
                            "font-size_heading-5",
                            "color_black",
                            "about__title",
                        ]}
                    >
                        And in conclusion ...
                    </Text>
                    <Text
                        classes={["inter-400-font", "font-size_l", "color_black", "welcome-text"]}
                    >
                        Each of us contributed to the project using our unique skills and knowledge.
                        Our team believes in the power of collaboration. Regular online sessions,
                        during which we actively planned the stages of sprint implementation,
                        distributed tasks and discussed current problems, allowed us to cope with
                        all difficulties and bring the job to completion. We hope you enjoy our app!
                    </Text>
                </div>
            </div>
            <div className="rs-link">
                <Link to="https://rs.school" target="_blank">
                    <ReactLogo className="rs-logo" width="150" />
                </Link>
            </div>
        </section>
    );
}

export default AboutPage;
