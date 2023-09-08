import React from "react";
import { BasketResponseType } from "view/app-components/BasketPage/BasketPage";
import BasketItem from "view/app-components/BasketPage/BasketItem";

export type BasketItemsPropsType = {
    basketResponse: BasketResponseType;
    removeItem: () => void;
};

function BasketItems({ basketResponse, removeItem }: BasketItemsPropsType) {
    return basketResponse.lineItems.map((basketItem) => (
        <BasketItem lineItemData={basketItem} key={basketItem.id} removeItem={removeItem} />
    ));
}

export default BasketItems;
