import React from "react";
import { Link } from "react-router-dom";
import Text from "shared/components/Text/text";

interface IPageHeading {
    navigation: string;
    title: string;
    description: string;
}

export default function PageHeading({ navigation, title, description }: IPageHeading) {
    return (
        <div className="page__header">
            {/* <Text classes={["inter-400-font", "font-size_l", "color_blue-dark"]}>{navigation}</Text> */}
            <ul className="product__category-list">
                <li>
                    <Link to="/">
                        <span className="inter-400-font font-size_l color_blue-dark">Home</span>
                    </Link>
                </li>
                <li className="product__category-list__separator" />
                <li>
                    <Link to="/shop">
                        <span className="inter-400-font font-size_l color_blue-dark">Shop</span>
                    </Link>
                </li>
                {navigation && (
                    <>
                        <li className="product__category-list__separator" />
                        <li>
                            <Link to={`/shop/${navigation}`}>
                                <span className="inter-400-font font-size_l color_blue-dark">
                                    {navigation}
                                </span>
                            </Link>
                        </li>
                    </>
                )}
            </ul>
            <Text classes={["space-grotesk-500-font", "font-size_heading-3", "color_black"]}>
                {title}
            </Text>
            <Text
                classes={["inter-400-font", "font-size_l", "color_blue-dark", "page__description"]}
            >
                {description}
            </Text>
        </div>
    );
}
