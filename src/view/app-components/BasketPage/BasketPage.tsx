import React, { useEffect, useRef } from "react";
import BasketService from "service/BasketService/BasketService";

export type CartResponseType = {
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
    lineItems: [];
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

function BasketPage() {
    const BASKET_SERVICE = useRef(new BasketService());

    useEffect(() => {
        const getBasket = async () => {
            const basketResponse = await BASKET_SERVICE.current.getCartById();

            console.log(basketResponse);
        };

        getBasket();
    }, []);

    return (
        <div>
            <h1>Basket Page! I am ready to go!</h1>
        </div>
    );
}

export default BasketPage;
