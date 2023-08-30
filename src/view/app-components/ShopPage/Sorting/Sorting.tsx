import React from "react";
import Text from "shared/components/Text/text";

interface IProductCount {
    count: number;
}

export function Sorting({ count }: IProductCount) {
    return (
        <div className="sorting">
            <Text classes={["inter-400-font", "font-size_m", "color_grey-dark"]}>{`${
                count > 1 ? `${count} products` : `${count} product`
            }`}</Text>
            <select
                name="sorting__option"
                id="sorting-select"
                className="inter-400-font font-size_m color_black"
            >
                <option value="ascending">Price ascending</option>
                <option value="descending">Price descending</option>
            </select>
        </div>
    );
}
