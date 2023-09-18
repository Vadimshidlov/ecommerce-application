import React, { ChangeEvent } from "react";
import Text from "shared/components/Text/text";

interface ISorting {
    productsCount: number;
    onChangeSort: (param: string) => void;
}

export function Sorting({ productsCount, onChangeSort }: ISorting) {
    function clickOption(event: ChangeEvent<HTMLSelectElement>) {
        if (event.target.value === "price-asc") {
            onChangeSort("sort=price%20asc");
        } else if (event.target.value === "price-desc") {
            onChangeSort("sort=price%20desc");
        } else if (event.target.value === "name-asc") {
            onChangeSort("sort=name.en-US%20asc");
        } else if (event.target.value === "name-desc") {
            onChangeSort("sort=name.en-US%20desc");
        }
    }

    return (
        <div className="sorting">
            <Text classes={["inter-400-font", "font-size_m", "color_grey-dark"]}>{`${
                productsCount > 1 ? `${productsCount} products` : `${productsCount} product`
            }`}</Text>
            <div className="sorting__wrapper">
                <Text classes={["inter-400-font", "font-size_m", "color_grey-dark"]}>Sort by:</Text>
                <select
                    name="sorting__option"
                    id="sorting-select"
                    className="inter-400-font font-size_m color_black"
                    onChange={clickOption}
                >
                    <option value="price-asc">Price ascending</option>
                    <option value="price-desc">Price descending</option>
                    <option value="name-asc">Name A-Z</option>
                    <option value="name-desc">Name Z-A</option>
                </select>
            </div>
        </div>
    );
}
