/* eslint-disable jsx-a11y/label-has-associated-control */
import React from "react";
import Text from "shared/components/Text/text";
import { Button } from "shared/components/button/Button";
import ProductService from "service/ProductService";
// import { useCategorie } from "providers/FilterProvider";

export interface IQueryParams {
    param: string;
    type: string;
}
interface IValue {
    onChangeColor: ({ param, type }: IQueryParams) => void;
    onChangeCategory: (param: string) => void;
}

export function Filter({ onChangeColor, onChangeCategory }: IValue) {
    // const { setCategorie } = useCategorie();
    const PRODUCT_SREVICE = new ProductService();

    // const [queryParams, setQueryParams] = useState("");

    async function filterCategories(key: string) {
        try {
            const { id } = (await PRODUCT_SREVICE.getCategoryByKey(key)).data;
            // const { results } = await (await PRODUCT_SREVICE.getProductsByCategoriId()).data;

            // setCategorie(results);
            onChangeCategory(`filter=categories.id:"${id}"`);
        } catch (error) {
            onChangeCategory("");

            // const { results } = await (await PRODUCT_SREVICE.getAllProducts()).data;

            // setCategorie(results);
        }
    }

    // async function getAllCategories() {
    //     const { results } = await (await PRODUCT_SREVICE.getAllProducts()).data;

    //     setCategorie(results);
    // }

    return (
        <div className="filter">
            <Text classes={["inter-600-font", "font-size_2xl", "color_black"]}>Filter</Text>

            <div className="filter__categories-list">
                <div className="filter__categorie">
                    <Button
                        text="All products"
                        textClasses={["inter-400-font", "font-size_xl", "color_black"]}
                        buttonClasses="filter__button"
                        onClick={() => onChangeCategory("")}
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
                    <input
                        type="checkbox"
                        id="color-yellow"
                        className="filter__colors-item"
                        onChange={() => {
                            onChangeColor({ param: "yellow", type: "color" });
                        }}
                    />
                    <input
                        type="checkbox"
                        id="color-black"
                        className="filter__colors-item"
                        onChange={() => {
                            onChangeColor({ param: "black", type: "color" });
                        }}
                    />
                    <input
                        type="checkbox"
                        id="color-blue"
                        className="filter__colors-item"
                        onChange={() => {
                            onChangeColor({ param: "blue", type: "color" });
                        }}
                    />
                    <input
                        type="checkbox"
                        id="color-green"
                        className="filter__colors-item"
                        onChange={() => {
                            onChangeColor({ param: "green", type: "color" });
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
                                onChangeColor({ param: "xs", type: "size" });
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
                                onChangeColor({ param: "s", type: "size" });
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
                                onChangeColor({ param: "m", type: "size" });
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
                                onChangeColor({ param: "l", type: "size" });
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
                                onChangeColor({ param: "xl", type: "size" });
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
                                onChangeColor({ param: "xxl", type: "size" });
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
        </div>
    );
}
