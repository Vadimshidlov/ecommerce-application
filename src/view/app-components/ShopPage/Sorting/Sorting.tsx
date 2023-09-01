import React, { ChangeEvent } from "react";
import { IQueryParams } from "view/app-components/ShopPage/Filter/Filter";
import Text from "shared/components/Text/text";

interface ISorting {
    count: number;
    onChangeSort: ({ param, type }: IQueryParams) => void;
}

// type SortType = {
//     onChangeSort: ({ param, type }: IQueryParams) => void;
// };

export function Sorting({ count, onChangeSort }: ISorting) {
    function clickOption(event: ChangeEvent<HTMLSelectElement>) {
        onChangeSort(
            event.target.value === "ascending"
                ? { param: "asc", type: "sort" }
                : { param: "desc", type: "sort" },
        );
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
                <option value="ascending">Price ascending</option>
                <option value="descending">Price descending</option>
            </select>
        </div>
    );
}
