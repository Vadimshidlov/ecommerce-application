import React from "react";
import "view/app-components/Header/buttons/style.scss";

type QuantityItemType = { quantity: number };

export default function QuantityItemsInBasket({ quantity }: QuantityItemType) {
    return <div className="circle font-size_s">{quantity}</div>;
}
