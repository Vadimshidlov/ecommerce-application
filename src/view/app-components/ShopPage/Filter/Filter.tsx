/* eslint-disable jsx-a11y/label-has-associated-control */
import React from "react";
import Text from "shared/components/Text/text";
import { Button } from "shared/components/button/Button";
import { Search } from "shared/components/Search/Search";
import { Link } from "react-router-dom";
import { ButtonIcon } from "shared/components/ButtonIcon/ButtonIcon";
import close from "assets/svg/close.svg";
import minus from "assets/svg/Minus.svg";

export interface IQueryParams {
    param: string;
    type: string;
    inputFiled?: string;
}

type FilterType = {
    onChangeFilter: ({ param, type }: IQueryParams) => void;
    resetAllFilters: () => void;
    activeCategory: string;
    activeButton: boolean;
    setActiveButton: (value: React.SetStateAction<boolean>) => void;
};

export function Filter({
    onChangeFilter,
    activeCategory,
    resetAllFilters,
    activeButton,
    setActiveButton,
}: FilterType) {
    const buttonClasses = (category: string) =>
        `filter__category ${category === activeCategory ? "filter__category_active" : ""}`;

    return (
        <>
            {activeButton && (
                <div
                    className="filter__blur-bg"
                    onClick={() => {
                        setActiveButton(!activeButton);
                    }}
                    onKeyDown={() => {}}
                />
            )}
            <div className={`filter ${activeButton ? "filter_active" : ""}`}>
                <Text classes={["inter-600-font", "font-size_2xl", "color_black"]}>Filter</Text>
                {activeButton && (
                    <ButtonIcon
                        url={close}
                        altText="close-icon"
                        classes="filter__close-button"
                        onClick={() => {
                            setActiveButton(!activeButton);
                        }}
                    />
                )}
                <Search
                    onChangeSearch={({ param, type }: IQueryParams) =>
                        onChangeFilter({ param, type })
                    }
                />
                <div className="filter__categories-list">
                    <div className="filter__category">
                        <Link to="/shop">
                            <Button
                                text="All products"
                                textClasses={["inter-400-font", "font-size_xl", "color_black"]}
                                buttonClasses={buttonClasses("")}
                            />
                        </Link>
                    </div>
                    <div className="filter__category">
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
                                        textClasses={[
                                            "inter-400-font",
                                            "font-size_m",
                                            "color_black",
                                        ]}
                                        buttonClasses={buttonClasses("sneakers")}
                                    />
                                </Link>
                            </li>
                            <li>
                                <Link to="/shop/slippers">
                                    <Button
                                        text="Slippers"
                                        textClasses={[
                                            "inter-400-font",
                                            "font-size_m",
                                            "color_black",
                                        ]}
                                        buttonClasses={buttonClasses("slippers")}
                                    />
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="filter__category">
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
                                        textClasses={[
                                            "inter-400-font",
                                            "font-size_m",
                                            "color_black",
                                        ]}
                                        buttonClasses={buttonClasses("t-shirt")}
                                    />
                                </Link>
                            </li>
                            <li>
                                <Link to="/shop/shorts">
                                    <Button
                                        text="Shorts"
                                        textClasses={[
                                            "inter-400-font",
                                            "font-size_m",
                                            "color_black",
                                        ]}
                                        buttonClasses={buttonClasses("shorts")}
                                    />
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="filter__color">
                    <Text classes={["inter-600-font", "font-size_xl", "color_blue-dark"]}>
                        Color
                    </Text>
                    <div className="filter__color-wrapper">
                        <input
                            type="checkbox"
                            id="color-yellow"
                            className="filter__color-input"
                            onChange={() => {
                                onChangeFilter({ param: "%22yellow%22", type: "color" });
                            }}
                        />
                        <input
                            type="checkbox"
                            id="color-black"
                            className="filter__color-input"
                            onChange={() => {
                                onChangeFilter({ param: "%22black%22", type: "color" });
                            }}
                        />
                        <input
                            type="checkbox"
                            id="color-blue"
                            className="filter__color-input"
                            onChange={() => {
                                onChangeFilter({ param: "%22blue%22", type: "color" });
                            }}
                        />
                        <input
                            type="checkbox"
                            id="color-green"
                            className="filter__color-input"
                            onChange={() => {
                                onChangeFilter({ param: "%22green%22", type: "color" });
                            }}
                        />
                        <input
                            type="checkbox"
                            id="color-red"
                            className="filter__color-input"
                            onChange={() => {
                                onChangeFilter({ param: "%22red%22", type: "color" });
                            }}
                        />
                    </div>
                </div>
                <div className="filter__size">
                    <Text classes={["inter-600-font", "font-size_xl", "color_blue-dark"]}>
                        Size
                    </Text>
                    <div className="filter__size-wrapper">
                        <div className="filter__size-items">
                            <input
                                type="checkbox"
                                id="size-2"
                                className="filter__size-input"
                                onChange={() => {
                                    onChangeFilter({ param: "%222%22", type: "size" });
                                }}
                            />
                            <label htmlFor="size-2">2</label>
                        </div>
                        {/* <button className="product__size"></button> */}
                        <div className="filter__size-items">
                            <input
                                type="checkbox"
                                id="size-4"
                                className="filter__size-input"
                                onChange={() => {
                                    onChangeFilter({ param: "%224%22", type: "size" });
                                }}
                            />
                            <label htmlFor="size-4">4</label>
                        </div>
                        <div className="filter__size-items">
                            <input
                                type="checkbox"
                                id="size-6"
                                className="filter__size-input"
                                onChange={() => {
                                    onChangeFilter({ param: "%226%22", type: "size" });
                                }}
                            />
                            <label htmlFor="size-6">6</label>
                        </div>
                        <div className="filter__size-items">
                            <input
                                type="checkbox"
                                id="size-10"
                                className="filter__size-input"
                                onChange={() => {
                                    onChangeFilter({ param: "%2210%22", type: "size" });
                                }}
                            />
                            <label htmlFor="size-10">10</label>
                        </div>
                        <div className="filter__size-items">
                            <input
                                type="checkbox"
                                id="size-13"
                                className="filter__size-input"
                                onChange={() => {
                                    onChangeFilter({ param: "%2213%22", type: "size" });
                                }}
                            />
                            <label htmlFor="size-13">13</label>
                        </div>
                        <div className="filter__size-items">
                            <input
                                type="checkbox"
                                id="size-14"
                                className="filter__size-input"
                                onChange={() => {
                                    onChangeFilter({ param: "%2214%22", type: "size" });
                                }}
                            />
                            <label htmlFor="size-14">14</label>
                        </div>
                        <div className="filter__size-items">
                            <input
                                type="checkbox"
                                id="size-15"
                                className="filter__size-input"
                                onChange={() => {
                                    onChangeFilter({ param: "%2215%22", type: "size" });
                                }}
                            />
                            <label htmlFor="size-15">15</label>
                        </div>
                        <div className="filter__size-items">
                            <input
                                type="checkbox"
                                id="size-16"
                                className="filter__size-input"
                                onChange={() => {
                                    onChangeFilter({ param: "%2216%22", type: "size" });
                                }}
                            />
                            <label htmlFor="size-16">16</label>
                        </div>
                    </div>
                </div>
                <div className="filter__brand">
                    <Text classes={["inter-600-font", "font-size_xl", "color_blue-dark"]}>
                        Brand
                    </Text>
                    <div className="filter__brand-wrapper">
                        <div className="filter__brand-items">
                            <input
                                type="checkbox"
                                id="adidas"
                                className="filter__brand-input"
                                onChange={() => {
                                    onChangeFilter({ param: "%22adidas%22", type: "brand" });
                                }}
                            />
                            <label htmlFor="adidas">Adidas</label>
                        </div>
                        <div className="filter__brand-items">
                            <input
                                type="checkbox"
                                id="nike"
                                className="filter__brand-input"
                                onChange={() => {
                                    onChangeFilter({ param: "%22nike%22", type: "brand" });
                                }}
                            />
                            <label htmlFor="nike">Nike</label>
                        </div>
                    </div>
                </div>
                <div className="filter__price">
                    <Text classes={["inter-600-font", "font-size_xl", "color_blue-dark"]}>
                        Price
                    </Text>
                    <div className="filter__price-wrapper">
                        <input
                            type="number"
                            placeholder="min $"
                            className="inter-400-font font-size_m filter__price-input"
                            onChange={(event) => {
                                onChangeFilter({
                                    param: `${event.target.value ? +event.target.value * 100 : ""}`,
                                    type: "price",
                                    inputFiled: "min",
                                });
                            }}
                        />
                        <img src={minus} alt="minus-svg" />
                        <input
                            type="number"
                            placeholder="max $"
                            className="inter-400-font font-size_m filter__price-input"
                            onChange={(event) => {
                                onChangeFilter({
                                    param: `${event.target.value ? +event.target.value * 100 : ""}`,
                                    type: "price",
                                    inputFiled: "max",
                                });
                            }}
                        />
                    </div>
                </div>
                <div className="filter__reset">
                    <Button
                        type="button"
                        text="Reset filters"
                        textClasses={["space-grotesk-500-font", "font-size_l", "color_white"]}
                        buttonClasses="button btn-full-width filter__reset-button"
                        onClick={resetAllFilters}
                    />
                </div>
            </div>
        </>
    );
}
