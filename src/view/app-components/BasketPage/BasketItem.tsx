import React, { useRef, useState } from "react";
import { LineItemsType } from "view/app-components/BasketPage/BasketPage";
import Text from "shared/components/Text/text";
import { ButtonIcon } from "shared/components/ButtonIcon/ButtonIcon";
import minusButton from "assets/svg/Minus.svg";
import plusButton from "assets/svg/Plus.svg";
import BasketService from "service/BasketService/BasketService";

export type BasketItemPropsType = {
    lineItemData: LineItemsType;
    getBasketHandler: () => void;
};

function BasketItem({ lineItemData, getBasketHandler }: BasketItemPropsType) {
    const LINE_ITEM_ID = lineItemData.id;
    const BASKET_SERVICE = useRef(new BasketService());
    const [countItem, setCountItem] = useState(Number(lineItemData.quantity));
    const discountPriceCent = lineItemData?.price?.discounted?.value?.centAmount;
    const discountPrice = discountPriceCent / 100;
    const realPriceCent = lineItemData.price.value.centAmount;
    const realPrice = realPriceCent / 100;

    const changeLineItemQuantityHandler = async (count: number) => {
        try {
            await BASKET_SERVICE.current.changeLineItemQuantity(LINE_ITEM_ID, count);
            // const basketResponse = await BASKET_SERVICE.current.getCartById();
            // console.log(basketResponse, `basketResponse`);
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <div className="basket__item">
            <div className="basket__item__left">
                <div className="basket__item-image">
                    <img src={lineItemData.variant.images[0].url} alt="" />
                </div>
                <div className="bakset__item-info">
                    <Text classes={["space-grotesk-500-font", "font-size_m", "page-title"]}>
                        {lineItemData.name["en-US"]}
                    </Text>
                    <div className="bakset__item-attributes">
                        {lineItemData.variant.attributes.map((attribute, index, lineItemsList) => (
                            <div key={attribute.name}>
                                <Text
                                    classes={[
                                        "space-grotesk-500-font",
                                        "font-size_s",
                                        "page-title",
                                    ]}
                                >
                                    {index !== lineItemsList.length - 1
                                        ? `${attribute.name}: ${attribute.value.key},`
                                        : `${attribute.name}: ${attribute.value.key}`}
                                </Text>
                            </div>
                        ))}
                    </div>
                    <button
                        type="button"
                        className="basket__item-remove font-size_s space-grotesk-500-font"
                        onClick={async () => {
                            try {
                                await changeLineItemQuantityHandler(0);
                                getBasketHandler();
                            } catch (e) {
                                console.log(e);
                            }
                        }}
                    >
                        Remove
                    </button>
                </div>
            </div>
            <div className="basket__item__right">
                <div className="basket__item__quantity">
                    <ButtonIcon
                        url={minusButton}
                        altText="icon-eye"
                        classes="quantity__button"
                        onClick={async () => {
                            if (countItem > 1) {
                                setCountItem(countItem - 1);
                                await changeLineItemQuantityHandler(countItem - 1);
                                getBasketHandler();
                            }
                        }}
                    />
                    <span>{countItem}</span>
                    <ButtonIcon
                        url={plusButton}
                        altText="icon-eye"
                        classes="quantity__button"
                        onClick={async () => {
                            setCountItem(countItem + 1);
                            await changeLineItemQuantityHandler(countItem + 1);
                            getBasketHandler();
                        }}
                    />
                </div>
                <Text classes={["inter-600-font", "font-size_l", "page-title"]}>
                    {`$ ${discountPrice || realPrice}`}
                </Text>
                <Text classes={["inter-600-font", "font-size_l", "page-title"]}>
                    {`$ ${countItem * (discountPrice || realPrice)}`}
                </Text>
            </div>
        </div>
    );
}

export default BasketItem;
