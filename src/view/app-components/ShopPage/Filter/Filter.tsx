/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from "react";
import Text from "shared/components/Text/text";
import { Button } from "shared/components/button/Button";
import ProductService from "service/ProductService";
// import { useCategorie } from "providers/FilterProvider";

export interface IQueryParams {
    param: string;
    type: string;
}
interface IValue {
    onChangeFn: ({ param, type }: IQueryParams) => void;
    onChangeCategory: (param: string) => void;
}

export function Filter({ onChangeFn, onChangeCategory }: IValue) {
    const PRODUCT_SREVICE = new ProductService();
    const [activeButton, setActiveButton] = useState("");

    async function filterCategories(key: string) {
        try {
            const { id } = (await PRODUCT_SREVICE.getCategoryByKey(key)).data;

            onChangeCategory(`filter=categories.id:"${id}"`);
        } catch (error) {
            onChangeCategory("");
        }
    }

    const handleButtonClick = (category: string) => {
        setActiveButton(category);
        if (category === "") {
            onChangeCategory(category);
        } else {
            filterCategories(category);
        }
    };

    const buttonClasses = (category: string) =>
        `filter__button ${category === activeButton ? "filter__button_active" : ""}`;

    return (
        <div className="filter">
            <Text classes={["inter-600-font", "font-size_2xl", "color_black"]}>Filter</Text>

            <div className="filter__categories-list">
                <div className="filter__categorie">
                    <Button
                        text="All products"
                        textClasses={["inter-400-font", "font-size_xl", "color_black"]}
                        buttonClasses={buttonClasses("")}
                        onClick={() => handleButtonClick("")}
                    />
                </div>
                <div className="filter__categorie">
                    <Button
                        text="Shoes"
                        textClasses={["inter-400-font", "font-size_xl", "color_black"]}
                        buttonClasses={buttonClasses("shoes")}
                        onClick={() => handleButtonClick("shoes")}
                    />
                    <ul className="filter__subcategories">
                        <li>
                            <Button
                                text="Sneakers"
                                textClasses={["inter-400-font", "font-size_m", "color_black"]}
                                buttonClasses={buttonClasses("shoes_sneakers")}
                                onClick={() => handleButtonClick("shoes_sneakers")}
                            />
                        </li>
                        <li>
                            <Button
                                text="Slippers"
                                textClasses={["inter-400-font", "font-size_m", "color_black"]}
                                buttonClasses={buttonClasses("shoes_slippers")}
                                onClick={() => handleButtonClick("shoes_slippers")}
                            />
                        </li>
                    </ul>
                </div>
                <div className="filter__categorie">
                    <Button
                        text="Clothes"
                        textClasses={["inter-400-font", "font-size_xl", "color_black"]}
                        buttonClasses={buttonClasses("clothes")}
                        onClick={() => handleButtonClick("clothes")}
                    />
                    <ul className="filter__subcategories">
                        <li>
                            <Button
                                text="T-short"
                                textClasses={["inter-400-font", "font-size_m", "color_black"]}
                                buttonClasses={buttonClasses("t-shirt")}
                                onClick={() => handleButtonClick("t-shirt")}
                            />
                        </li>
                        <li>
                            <Button
                                text="Shorts"
                                textClasses={["inter-400-font", "font-size_m", "color_black"]}
                                buttonClasses={buttonClasses("shorts")}
                                onClick={() => handleButtonClick("shorts")}
                            />
                        </li>
                    </ul>
                </div>
            </div>
            <div className="filter__colors">
                <Text classes={["inter-600-font", "font-size_xl", "color_blue-dark"]}>Color</Text>
                <div className="filter__colors-wrapper">
                    <input
                        type="checkbox"
                        id="color-yellow"
                        className="filter__colors-item"
                        onChange={() => {
                            onChangeFn({ param: "%22yellow%22", type: "color" });
                        }}
                    />
                    <input
                        type="checkbox"
                        id="color-black"
                        className="filter__colors-item"
                        onChange={() => {
                            onChangeFn({ param: "%22black%22", type: "color" });
                        }}
                    />
                    <input
                        type="checkbox"
                        id="color-blue"
                        className="filter__colors-item"
                        onChange={() => {
                            onChangeFn({ param: "%22blue%22", type: "color" });
                        }}
                    />
                    <input
                        type="checkbox"
                        id="color-green"
                        className="filter__colors-item"
                        onChange={() => {
                            onChangeFn({ param: "%22green%22", type: "color" });
                        }}
                    />
                </div>
            </div>
            <div className="filter__size">
                <Text classes={["inter-600-font", "font-size_xl", "color_blue-dark"]}>Size</Text>
                <div className="filter__size-wrapper">
                    <div className="filter__size-items">
                        <input
                            type="checkbox"
                            id="size-xs"
                            className="filter__size-item"
                            onChange={() => {
                                onChangeFn({ param: "%22xs%22", type: "size" });
                            }}
                        />
                        <label htmlFor="size-xs">XS</label>
                    </div>
                    <div className="filter__size-items">
                        <input
                            type="checkbox"
                            id="size-s"
                            className="filter__size-item"
                            onChange={() => {
                                onChangeFn({ param: "%22s%22", type: "size" });
                            }}
                        />
                        <label htmlFor="size-s">S</label>
                    </div>
                    <div className="filter__size-items">
                        <input
                            type="checkbox"
                            id="size-m"
                            className="filter__size-item"
                            onChange={() => {
                                onChangeFn({ param: "%22m%22", type: "size" });
                            }}
                        />
                        <label htmlFor="size-m">M</label>
                    </div>
                    <div className="filter__size-items">
                        <input
                            type="checkbox"
                            id="size-l"
                            className="filter__size-item"
                            onChange={() => {
                                onChangeFn({ param: "%22l%22", type: "size" });
                            }}
                        />
                        <label htmlFor="size-l">L</label>
                    </div>
                    <div className="filter__size-items">
                        <input
                            type="checkbox"
                            id="size-xl"
                            className="filter__size-item"
                            onChange={() => {
                                onChangeFn({ param: "%22xl%22", type: "size" });
                            }}
                        />
                        <label htmlFor="size-xl">XL</label>
                    </div>
                    <div className="filter__size-items">
                        <input
                            type="checkbox"
                            id="size-xxl"
                            className="filter__size-item"
                            onChange={() => {
                                onChangeFn({ param: "%22xxl%22", type: "size" });
                            }}
                        />
                        <label htmlFor="size-2xl">XXL</label>
                    </div>
                </div>
            </div>
            <div className="filter__price">
                <Text classes={["inter-600-font", "font-size_xl", "color_blue-dark"]}>Price</Text>
                <div className="filter__price-wrapper">
                    <input type="range" />
                </div>
            </div>
            <div className="filter__reset">
                <Button
                    type="button"
                    text="Reset filters"
                    textClasses={["space-grotesk-500-font", "font-size_l", "color_white"]}
                    buttonClasses="button"
                    onClick={() => console.log("btn-press")}
                />
            </div>
        </div>
    );
}
