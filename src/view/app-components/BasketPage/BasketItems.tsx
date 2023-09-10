import React from "react";
import { BasketResponseType } from "view/app-components/BasketPage/BasketPage";
import BasketItem from "view/app-components/BasketPage/BasketItem";

export type BasketItemsPropsType = {
    basketResponse: BasketResponseType;
    getBasketHandler: () => void;
};

function BasketItems({ basketResponse, getBasketHandler }: BasketItemsPropsType) {
    return basketResponse.lineItems.map((basketItem) => (
        <BasketItem
            lineItemData={basketItem}
            key={basketItem.id}
            getBasketHandler={getBasketHandler}
        />
    ));
}

export default BasketItems;
