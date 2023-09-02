import React, { ChangeEvent } from "react";
// import { IQueryParams } from "view/app-components/ShopPage/Filter/Filter";
import Text from "shared/components/Text/text";

interface ISorting {
    count: number;
    onChangeSort: (param: string) => void;
}

// type SortType = {
//     onChangeSort: ({ param, type }: IQueryParams) => void;
// };

export function Sorting({ count, onChangeSort }: ISorting) {
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
                count > 1 ? `${count} products` : `${count} product`
            }`}</Text>
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
    );
}
