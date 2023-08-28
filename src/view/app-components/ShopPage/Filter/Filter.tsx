/* eslint-disable jsx-a11y/label-has-associated-control */
import React from "react";
import Text from "shared/components/Text/text";
import { Button } from "shared/components/button/Button";
import ProductService from "service/ProductService";
import { useCategorie } from "providers/FilterProvider";

export default function Filter() {
    const { setCategorie } = useCategorie();
    const PRODUCT_SREVICE = new ProductService();

    async function filterCategories(key: string) {
        try {
            await PRODUCT_SREVICE.getCategoryByKey(key);
            const { results } = await (await PRODUCT_SREVICE.getProductsByCategoriId()).data;

            setCategorie(results);
        } catch (error) {
            const { results } = await (await PRODUCT_SREVICE.getAllProducts()).data;

            setCategorie(results);
        }
    }

    async function getAllCategories() {
        const { results } = await (await PRODUCT_SREVICE.getAllProducts()).data;

        setCategorie(results);
    }

    return (
        <div className="filter">
            <Text classes={["inter-600-font", "font-size_2xl", "color_black"]}>Filter</Text>

            <div className="filter__categories-list">
                <div className="filter__categorie">
                    <Button
                        text="All products"
                        textClasses={["inter-400-font", "font-size_xl", "color_black"]}
                        buttonClasses="filter__button"
                        onClick={() => getAllCategories()}
                    />
                </div>
                <div className="filter__categorie">
                    <Button
                        text="Shoes"
                        textClasses={["inter-400-font", "font-size_xl", "color_black"]}
                        buttonClasses="filter__button"
                        onClick={() => filterCategories("shoes")}
                    />
                    <ul className="filter__subcategories">
                        <li>
                            <Button
                                text="Sneakers"
                                textClasses={["inter-400-font", "font-size_m", "color_black"]}
                                buttonClasses="filter__button"
                                onClick={() => filterCategories("shoes_sneakers")}
                            />
                        </li>
                        <li>
                            <Button
                                text="Slippers"
                                textClasses={["inter-400-font", "font-size_m", "color_black"]}
                                buttonClasses="filter__button"
                                onClick={() => filterCategories("shoes_slippers")}
                            />
                        </li>
                    </ul>
                </div>
                <div className="filter__categorie">
                    <Button
                        text="Clothes"
                        textClasses={["inter-400-font", "font-size_xl", "color_black"]}
                        buttonClasses="filter__button"
                        onClick={() => filterCategories("clothes")}
                    />
                    <ul className="filter__subcategories">
                        <li>
                            <Button
                                text="T-short"
                                textClasses={["inter-400-font", "font-size_m", "color_black"]}
                                buttonClasses="filter__button"
                                onClick={() => filterCategories("t-shirt")}
                            />
                        </li>
                        <li>
                            <Button
                                text="Shorts"
                                textClasses={["inter-400-font", "font-size_m", "color_black"]}
                                buttonClasses="filter__button"
                                onClick={() => filterCategories("shorts")}
                            />
                        </li>
                    </ul>
                </div>
            </div>
            <div className="filter__colors">
                <Text classes={["inter-600-font", "font-size_xl", "color_blue-dark"]}>Color</Text>
                <div className="filter__colors-wrapper">
                    <input type="checkbox" id="color-yellow" className="filter__colors-item" />
                    <input type="checkbox" id="color-black" className="filter__colors-item" />
                    <input type="checkbox" id="color-blue" className="filter__colors-item" />
                    <input type="checkbox" id="color-green" className="filter__colors-item" />
                </div>
            </div>
            <div className="filter__size">
                <Text classes={["inter-600-font", "font-size_xl", "color_blue-dark"]}>Size</Text>
                <div className="filter__size-wrapper">
                    <div className="filter__size-items">
                        <input type="checkbox" id="size-xs" className="filter__size-item" />
                        <label htmlFor="size-xs">XS</label>
                    </div>
                    <div className="filter__size-items">
                        <input type="checkbox" id="size-s" className="filter__size-item" />
                        <label htmlFor="size-s">S</label>
                    </div>
                    <div className="filter__size-items">
                        <input type="checkbox" id="size-m" className="filter__size-item" />
                        <label htmlFor="size-m">M</label>
                    </div>
                    <div className="filter__size-items">
                        <input type="checkbox" id="size-l" className="filter__size-item" />
                        <label htmlFor="size-l">L</label>
                    </div>
                    <div className="filter__size-items">
                        <input type="checkbox" id="size-xl" className="filter__size-item" />
                        <label htmlFor="size-xl">XL</label>
                    </div>
                    <div className="filter__size-items">
                        <input type="checkbox" id="size-2xl" className="filter__size-item" />
                        <label htmlFor="size-2xl">2XL</label>
                    </div>
                </div>
            </div>
            <div className="filter__price">
                <Text classes={["inter-600-font", "font-size_xl", "color_blue-dark"]}>Price</Text>
            </div>
        </div>
    );
}
