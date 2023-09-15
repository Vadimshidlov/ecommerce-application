/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback, useEffect, useRef, useState } from "react";
import BasketService, { ClearBasketActionsType } from "service/BasketService/BasketService";
import Text from "shared/components/Text/text";
import TableHead from "view/app-components/BasketPage/TableHead/TableHead";
import BasketItems from "view/app-components/BasketPage/BasketItems";
import { Button } from "shared/components/button/Button";
import { NavLink } from "react-router-dom";
import { removeProductMessage, somethingWrongMessage } from "shared/utils/notifyMessages";
import { observer } from "mobx-react-lite";
import BasketStore from "store/basket-store";
import { AuthDataStore } from "service/AuthDataStore/AuthDataStore";
import BasketPromo from "view/app-components/BasketPage/BasketPromo/BasketPromo";

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
    const AUTH_DATA_STORE = useRef(new AuthDataStore());
    const [basketData, setBasketData] = useState<BasketResponseType>();
    const [totalPrice, setTotalPrice] = useState<number>(0);
    const [promoCode, setPromoCode] = useState<string>("");
    const { getBasketVersion, setBasketVersion } = BasketStore;
    const basketService = useRef(new BasketService());

    const getBasket = useCallback(async () => {
        console.log(`getBasket`);

        // await BASKET_SERVICE.current.getActiveCart();

        if (!localStorage.getItem("cartId")) {
            console.log("Anon Basket Page");
            const basketResponse = await basketService.current.createBasket();
            setBasketVersion(`${basketResponse.version}`);
        }

        const basketResponse = await BASKET_SERVICE.current.getCartById();
        setBasketData(basketResponse);
        const totalPriceResult = basketData?.totalPrice?.centAmount;

        AUTH_DATA_STORE.current.setBasketVersion(JSON.stringify(basketResponse.version));

        if (totalPriceResult) {
            setTotalPrice(totalPriceResult / 100);
        }
    }, [basketData?.totalPrice?.centAmount, setBasketVersion]);

    useEffect(() => {
        getBasket();
    }, [getBasket]);

    useEffect(() => {
        console.log(promoCode, `promoCode value`);
    }, [promoCode]);

    const clearBasketHandler = async () => {
        if (basketData) {
            try {
                const clearBasketActionsList: ClearBasketActionsType[] = [];

                basketData?.lineItems.forEach((lineItem) => {
                    clearBasketActionsList.push({
                        action: "removeLineItem",
                        lineItemId: `${lineItem.id}`,
                        quantity: lineItem.quantity,
                    });
                });

                const clearBasketResponse = await BASKET_SERVICE.current.removeLineItemsFromBasket(
                    clearBasketActionsList,
                );

                setBasketVersion(`${clearBasketResponse.version}`);
                setBasketData(clearBasketResponse);

                removeProductMessage("All products are");
            } catch (e) {
                somethingWrongMessage();
            }
        }
    };

    return (
        <div className="basket__container">
            <Text classes={["space-grotesk-500-font", "font-size_heading-3", "page-title"]}>
                Cart
            </Text>

            {basketData && basketData.lineItems.length !== 0 ? (
                <>
                    <Text
                        classes={[
                            "space-grotesk-500-font",
                            "font-size_heading-4",
                            "page-title",
                            "basket__total-price",
                        ]}
                    >
                        {`Total price: $ ${totalPrice}`}
                    </Text>
                    <Button
                        type="button"
                        text="Clear Basket"
                        textClasses={["space-grotesk-500-font", "font-size_l", "color_white"]}
                        buttonClasses="button-shop basket__clear-btn"
                        onClick={clearBasketHandler}
                    />
                    <BasketPromo promoCode={promoCode} setPromoCode={setPromoCode} />
                    <TableHead />
                    <BasketItems basketResponse={basketData} getBasketHandler={getBasket} />
                </>
            ) : (
                <>
                    <div className="basket__empty-message">
                        <Text
                            classes={[
                                "space-grotesk-500-font",
                                "font-size_heading-4",
                                "page-title",
                            ]}
                        >
                            Ooops...Your basket is empty
                        </Text>
                    </div>
                    <div>
                        <NavLink to="/shop">
                            <Button
                                type="button"
                                text="See Collection"
                                textClasses={[
                                    "space-grotesk-500-font",
                                    "font-size_l",
                                    "color_white",
                                ]}
                                buttonClasses="button-shop"
                            />
                        </NavLink>
                    </div>
                </>
            )}
        </div>
    );
}

export default observer(BasketPage);
