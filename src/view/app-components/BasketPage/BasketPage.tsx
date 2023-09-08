/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import BasketService from "service/BasketService/BasketService";
import Text from "shared/components/Text/text";
import TableHead from "view/app-components/BasketPage/TableHead/TableHead";
import BasketItems from "view/app-components/BasketPage/BasketItems";

export type BasketResponseType = {
    type: string;
    id: string;
    version: number;
    createdAt: string;
    lastModifiedAt: string;
    lastModifiedBy: {
        isPlatformClient: false;
    };
    createdBy: {
        isPlatformClient: false;
    };
    lineItems: LineItemsType[];
    cartState: string;
    totalPrice: {
        type: string;
        currencyCode: string;
        centAmount: number;
        fractionDigits: number;
    };
    shippingMode: string;
    shipping: [];
    customLineItems: [];
    discountCodes: [];
    directDiscounts: [];
    inventoryMode: string;
    taxMode: string;
    taxRoundingMode: string;
    taxCalculationMode: string;
    refusedGifts: [];
    origin: string;
    itemShippingAddresses: [];
};

export type AttributeType = {
    name: string;
    value: {
        key: string;
        label: string;
    };
};

export type LineItemsType = {
    addedAt: string;
    discountedPricePerQuantity: [];
    id: string;
    lastModifiedAt: string;
    lineItemMode: string;
    name: { "en-US": string };
    perMethodTaxRate: [];
    price: {
        discounted: {
            discount: {
                id: string;
                typeId: string;
            };
            value: {
                centAmount: number;
                currencyCode: string;
                fractionDigits: number;
                type: string;
            };
        };
        id: string;
        value: {
            centAmount: number;
            currencyCode: string;
            fractionDigits: number;
            type: string;
        };
    };
    priceMode: string;
    productId: string;
    productKey: string;
    productSlug: { "en-US": string };
    productType: { typeId: string; id: string; version: number };
    quantity: number;
    state: [];
    taxedPricePortions: [];
    totalPrice: { type: string; currencyCode: string; centAmount: number; fractionDigits: number };
    variant: {
        assets: [];
        attributes: AttributeType[];
        id: 1;
        images: [
            {
                url: string;
            },
        ];
        key: "shoes_slippers_shoes_2_1";
        prices: [];
        sku: "shoes_slippers_shoes_2_1";
    };
};

function BasketPage() {
    const BASKET_SERVICE = useRef(new BasketService());
    const [basketData, setBasketData] = useState<BasketResponseType>();
    const [isRemoveItem, setIsRemoveItem] = useState<boolean>(false);

    useEffect(() => {
        const getBasket = async () => {
            const basketResponse = await BASKET_SERVICE.current.getCartById();
            setBasketData(basketResponse);

            console.log(basketResponse);
        };

        getBasket();
    }, [isRemoveItem]);

    const removeItemStateHandler = () => {
        setIsRemoveItem((prevState) => !prevState);
    };

    return (
        <div className="basket__container">
            <Text classes={["space-grotesk-500-font", "font-size_heading-3", "page-title"]}>
                Cart
            </Text>
            <TableHead />
            {basketData ? (
                <BasketItems basketResponse={basketData} removeItem={removeItemStateHandler} />
            ) : null}
        </div>
    );
}

export default BasketPage;
