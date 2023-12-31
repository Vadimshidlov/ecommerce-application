/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback, useEffect, useRef, useState } from "react";
import BasketService, { ClearBasketActionsType } from "service/BasketService/BasketService";
import Text from "shared/components/Text/text";
import TableHead from "view/app-components/BasketPage/TableHead/TableHead";
import BasketItems from "view/app-components/BasketPage/BasketItems";
import { Button } from "shared/components/button/Button";
import { NavLink } from "react-router-dom";
import {
    haveAGoodDayMessage,
    removeProductMessage,
    somethingWrongMessage,
} from "shared/utils/notifyMessages";
import { observer } from "mobx-react-lite";
import BasketStore from "store/basket-store";
import { AuthDataStore } from "service/AuthDataStore/AuthDataStore";
import BasketPromo from "view/app-components/BasketPage/BasketPromo/BasketPromo";
import PageHeading from "shared/components/PageHeading/PageHeading";
import { useBasketQuantity } from "providers/BasketItemsProvider";

export type DiscountCodesType = {
    discountCode: {
        typeId: string;
        id: string;
    };
};

export type DiscountCodesRemoveType = {
    action: string;
    discountCode: {
        typeId: string;
        id: string;
    };
};

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
    discountCodes: DiscountCodesType[];
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
    discountedPrice: {
        value: {
            type: string;
            currencyCode: string;
            centAmount: number;
            fractionDigits: number;
        };
        includedDiscounts: [
            {
                discount: {
                    typeId: string;
                    id: string;
                };
                discountedAmount: {
                    type: string;
                    currencyCode: string;
                    centAmount: number;
                    fractionDigits: number;
                };
            },
        ];
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
    const [oldPrice, setOldPrice] = useState<number>(0);
    const { updateBasketStore } = BasketStore;

    const { setQuantity } = useBasketQuantity();

    const getBasket = useCallback(async () => {
        const basketResponse = await BASKET_SERVICE.current.getCartById();
        setBasketData(basketResponse);
        setQuantity(basketResponse.lineItems.length);

        updateBasketStore(basketResponse);
        const totalPriceResult = basketData?.totalPrice?.centAmount;

        if (basketResponse.discountCodes.length !== 0) {
            const oldAmountPrice = basketResponse.lineItems.reduce((amountPrice, lineItem) => {
                const discountPriceCent = lineItem?.price?.discounted?.value?.centAmount;
                const discountPrice = discountPriceCent / 100;
                const fullPrice = lineItem.price.value.centAmount / 100;

                const newPrice = amountPrice + lineItem.quantity * (discountPrice || fullPrice);
                return newPrice;
            }, 0);

            setOldPrice(oldAmountPrice);
        }

        AUTH_DATA_STORE.current.setBasketVersion(JSON.stringify(basketResponse.version));

        if (totalPriceResult) {
            setTotalPrice(totalPriceResult / 100);
        }
    }, [basketData?.totalPrice?.centAmount, setQuantity, updateBasketStore]);

    useEffect(() => {
        getBasket();
    }, [getBasket]);

    const clearBasketHandler = async () => {
        if (basketData) {
            try {
                const promoCodes: DiscountCodesRemoveType[] = [];
                basketData?.discountCodes.forEach((discountCode) => {
                    promoCodes.push({
                        action: "removeDiscountCode",
                        discountCode: {
                            typeId: discountCode.discountCode.typeId,
                            id: discountCode.discountCode.id,
                        },
                    });
                });

                await BASKET_SERVICE.current.removePromoCode(promoCodes);

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

                setBasketData(clearBasketResponse);

                removeProductMessage("All products are");
            } catch (e) {
                somethingWrongMessage();
            }
        }
    };

    return (
        <section className="container">
            <PageHeading
                navigation=""
                title="Cart"
                description="At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis
                    voluptatum deleniti."
            />
            <div className="basket__container">
                {basketData && basketData.lineItems.length !== 0 ? (
                    <>
                        <TableHead />
                        <BasketItems basketResponse={basketData} getBasketHandler={getBasket} />
                        <div className="basket__bottom-info">
                            <BasketPromo basketData={basketData} getBasketHandler={getBasket} />
                            <div className="basket__bottom-info-right">
                                {oldPrice ? (
                                    <div className="basket__total-prices">
                                        <Text
                                            classes={[
                                                "space-grotesk-500-font",
                                                "font-size_2xl",
                                                "page-title",
                                                "color_blue-dark",
                                                "basket__total-price",
                                            ]}
                                        >
                                            {`Total price: $ ${totalPrice.toFixed(2)}`}
                                        </Text>
                                        <Text
                                            classes={[
                                                "space-grotesk-500-font",
                                                "font-size_2xl",
                                                "page-title",
                                                "color_blue-dark",
                                                "basket__total-price",
                                                "basket__total-price__old",
                                            ]}
                                        >
                                            {`${oldPrice.toFixed(2)}`}
                                        </Text>
                                    </div>
                                ) : (
                                    <div>
                                        <Text
                                            classes={[
                                                "space-grotesk-500-font",
                                                "font-size_2xl",
                                                "page-title",
                                                "color_blue-dark",
                                                "basket__total-price",
                                            ]}
                                        >
                                            {`Total price: $ ${totalPrice.toFixed(2)}`}
                                        </Text>
                                    </div>
                                )}
                                <div className="basket__buttons">
                                    <Button
                                        type="button"
                                        text="Clear Basket"
                                        textClasses={[
                                            "space-grotesk-500-font",
                                            "font-size_l",
                                            "color_white",
                                        ]}
                                        buttonClasses="basket__clear-button"
                                        // buttonClasses="button-shop basket__clear-btn"
                                        onClick={clearBasketHandler}
                                    />
                                    <Button
                                        type="button"
                                        text="Checkout"
                                        textClasses={[
                                            "space-grotesk-500-font",
                                            "font-size_l",
                                            "color_white",
                                        ]}
                                        buttonClasses="basket__clear-button"
                                        onClick={() => {
                                            haveAGoodDayMessage();
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
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
                                    buttonClasses="button"
                                />
                            </NavLink>
                        </div>
                    </>
                )}
            </div>
        </section>
    );
}

export default observer(BasketPage);
