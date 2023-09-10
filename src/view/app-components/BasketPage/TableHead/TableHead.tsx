import React from "react";
import Text from "shared/components/Text/text";

function TableHead() {
    return (
        <div className="basket__products-header">
            <div className="products-header__left">
                <Text classes={["space-grotesk-500-font", "font-size_m", "page-title"]}>
                    Product
                </Text>
            </div>
            <div className="products-header__right">
                <Text classes={["space-grotesk-500-font", "font-size_m", "page-title"]}>
                    Quantity
                </Text>
                <Text classes={["space-grotesk-500-font", "font-size_m", "page-title"]}>Price</Text>
                <Text classes={["space-grotesk-500-font", "font-size_m", "page-title"]}>
                    Subtotal
                </Text>
            </div>
        </div>
    );
}

export default TableHead;
