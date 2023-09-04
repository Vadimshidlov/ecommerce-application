/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from "react";
import Text from "shared/components/Text/text";
import { Button } from "shared/components/button/Button";
import ProductService from "service/ProductService/ProductService";
import { Search } from "shared/components/Search/Search";
import { Link } from "react-router-dom";

export interface IQueryParams {
    param: string;
    type: string;
}
interface IFilter {
    onChangeFn: (newProducts: IProduct[]) => void;
    sortingParam: string;
    activeCategory?: string;
}

export interface IState {
    [type: string]: string[];
}

export interface IProduct {
    categories: [];
    id: string;
    key: string;
    name: {
        "en-US": string;
    };
    description: {
        "en-US": string;
    };
    masterVariant: {
        images: [
            {
                url: string;
            },
        ];
        prices: [
            {
                discounted: {
                    value: {
                        centAmount: number;
                    };
                };
                value: {
                    centAmount: number;
                };
            },
        ];
    };
}

const PRODUCT_SREVICE = new ProductService();

export function Filter({ onChangeFn, sortingParam, activeCategory }: IFilter) {
    // const [products, setProducts] = useState<IProduct[]>([]);
    // const [sortParams, setSortParams] = useState<string>("");
    const [categoryParams, setCategoryParams] = useState<string>("");
    const [objParams, setObjParams] = useState<IState>({});

    function collectParams({ param, type }: IQueryParams) {
        setObjParams((prevData) => {
            if (type === "search") {
                return {
                    ...prevData,
                    [type]: param ? [param] : [],
                };
            }
            const values = prevData[type] || [];
            const newValues = values.includes(param)
                ? (values as string[]).filter((value) => value !== param)
                : [...values, param];
            return {
                ...prevData,
                [type]: newValues,
            };
        });
    }

    async function filterCategories(key: string) {
        try {
            const { id } = (await PRODUCT_SREVICE.getCategoryByKey(key)).data;

            setCategoryParams(`filter=categories.id:"${id}"`);
        } catch (error) {
            setCategoryParams("");
        }
    }

    const buttonClasses = (category: string) =>
        `filter__button ${category === activeCategory ? "filter__button_active" : ""}`;

    useEffect(() => {
        async function setParams() {
            const keys: string[] = Object.keys(objParams);
            const params: string[] = [];
            const results: IProduct[] = [];

            keys.forEach((key) => {
                if (key === "search" && objParams[key].length > 0) {
                    params.push(`fuzzy=true&text.en-US=${objParams[key].join("")}`);
                } else if (objParams[key].length > 0) {
                    params.push(
                        `filter=variants.attributes.${key}.key:${objParams[key].join(",")}`,
                    );
                }
            });

            if (activeCategory) {
                filterCategories(activeCategory);
            }

            const queryParams = [categoryParams, params.join("&"), sortingParam].filter(Boolean);
            const url = queryParams.join("&");

            console.log(url);

            if (url) {
                results.push(...(await PRODUCT_SREVICE.getProductURL(url)).data.results);
            } else {
                results.push(...(await PRODUCT_SREVICE.getAllProducts()).data.results);
            }
            onChangeFn(results);
        }

        setParams();
    }, [activeCategory, categoryParams, objParams, onChangeFn, sortingParam]);

    return (
        <div className="filter">
            <Text classes={["inter-600-font", "font-size_2xl", "color_black"]}>Filter</Text>
            <Search
                onChangeSearch={({ param, type }: IQueryParams) => collectParams({ param, type })}
            />
            <div className="filter__categories-list">
                <div className="filter__categorie">
                    <Link to="/shop">
                        <Button
                            text="All products"
                            textClasses={["inter-400-font", "font-size_xl", "color_black"]}
                            buttonClasses={buttonClasses("")}
                        />
                    </Link>
                </div>
                <div className="filter__categorie">
                    <Link to="/shop/shoes">
                        <Button
                            text="Shoes"
                            textClasses={["inter-400-font", "font-size_xl", "color_black"]}
                            buttonClasses={buttonClasses("shoes")}
                        />
                    </Link>
                    <ul className="filter__subcategories">
                        <li>
                            <Link to="/shop/sneakers">
                                <Button
                                    text="Sneakers"
                                    textClasses={["inter-400-font", "font-size_m", "color_black"]}
                                    buttonClasses={buttonClasses("sneakers")}
                                />
                            </Link>
                        </li>
                        <li>
                            <Link to="/shop/slippers">
                                <Button
                                    text="Slippers"
                                    textClasses={["inter-400-font", "font-size_m", "color_black"]}
                                    buttonClasses={buttonClasses("slippers")}
                                />
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="filter__categorie">
                    <Link to="/shop/clothes">
                        <Button
                            text="Clothes"
                            textClasses={["inter-400-font", "font-size_xl", "color_black"]}
                            buttonClasses={buttonClasses("clothes")}
                        />
                    </Link>
                    <ul className="filter__subcategories">
                        <li>
                            <Link to="/shop/t-shirt">
                                <Button
                                    text="T-shirt"
                                    textClasses={["inter-400-font", "font-size_m", "color_black"]}
                                    buttonClasses={buttonClasses("t-shirt")}
                                />
                            </Link>
                        </li>
                        <li>
                            <Link to="/shop/shorts">
                                <Button
                                    text="Shorts"
                                    textClasses={["inter-400-font", "font-size_m", "color_black"]}
                                    buttonClasses={buttonClasses("shorts")}
                                />
                            </Link>
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
                            collectParams({ param: "%22yellow%22", type: "color" });
                        }}
                    />
                    <input
                        type="checkbox"
                        id="color-black"
                        className="filter__colors-item"
                        onChange={() => {
                            collectParams({ param: "%22black%22", type: "color" });
                        }}
                    />
                    <input
                        type="checkbox"
                        id="color-blue"
                        className="filter__colors-item"
                        onChange={() => {
                            collectParams({ param: "%22blue%22", type: "color" });
                        }}
                    />
                    <input
                        type="checkbox"
                        id="color-green"
                        className="filter__colors-item"
                        onChange={() => {
                            collectParams({ param: "%22green%22", type: "color" });
                        }}
                    />
                    <input
                        type="checkbox"
                        id="color-red"
                        className="filter__colors-item"
                        onChange={() => {
                            collectParams({ param: "%22red%22", type: "color" });
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
                            id="size-2"
                            className="filter__size-item"
                            onChange={() => {
                                collectParams({ param: "%222%22", type: "size" });
                            }}
                        />
                        <label htmlFor="size-2">2</label>
                    </div>
                    <div className="filter__size-items">
                        <input
                            type="checkbox"
                            id="size-4"
                            className="filter__size-item"
                            onChange={() => {
                                collectParams({ param: "%224%22", type: "size" });
                            }}
                        />
                        <label htmlFor="size-4">4</label>
                    </div>
                    <div className="filter__size-items">
                        <input
                            type="checkbox"
                            id="size-6"
                            className="filter__size-item"
                            onChange={() => {
                                collectParams({ param: "%226%22", type: "size" });
                            }}
                        />
                        <label htmlFor="size-6">6</label>
                    </div>
                    <div className="filter__size-items">
                        <input
                            type="checkbox"
                            id="size-10"
                            className="filter__size-item"
                            onChange={() => {
                                collectParams({ param: "%2210%22", type: "size" });
                            }}
                        />
                        <label htmlFor="size-10">10</label>
                    </div>
                    <div className="filter__size-items">
                        <input
                            type="checkbox"
                            id="size-13"
                            className="filter__size-item"
                            onChange={() => {
                                collectParams({ param: "%2213%22", type: "size" });
                            }}
                        />
                        <label htmlFor="size-13">13</label>
                    </div>
                    <div className="filter__size-items">
                        <input
                            type="checkbox"
                            id="size-14"
                            className="filter__size-item"
                            onChange={() => {
                                collectParams({ param: "%2214%22", type: "size" });
                            }}
                        />
                        <label htmlFor="size-14">14</label>
                    </div>
                    <div className="filter__size-items">
                        <input
                            type="checkbox"
                            id="size-15"
                            className="filter__size-item"
                            onChange={() => {
                                collectParams({ param: "%2215%22", type: "size" });
                            }}
                        />
                        <label htmlFor="size-15">15</label>
                    </div>
                    <div className="filter__size-items">
                        <input
                            type="checkbox"
                            id="size-16"
                            className="filter__size-item"
                            onChange={() => {
                                collectParams({ param: "%2216%22", type: "size" });
                            }}
                        />
                        <label htmlFor="size-16">16</label>
                    </div>
                </div>
            </div>
            <div className="filter__reset">
                <Button
                    type="button"
                    text="Reset filters"
                    textClasses={["space-grotesk-500-font", "font-size_l", "color_white"]}
                    buttonClasses="button"
                />
            </div>
        </div>
    );
}

Filter.defaultProps = {
    activeCategory: "",
};
