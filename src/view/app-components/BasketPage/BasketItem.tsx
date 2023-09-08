import React, { useRef, useState } from "react";
import { LineItemsType } from "view/app-components/BasketPage/BasketPage";
import Text from "shared/components/Text/text";
import { ButtonIcon } from "shared/components/ButtonIcon/ButtonIcon";
import minusButton from "assets/svg/Minus.svg";
import plusButton from "assets/svg/Plus.svg";
import BasketService from "service/BasketService/BasketService";

export type BasketItemPropsType = {
    lineItemData: LineItemsType;
    removeItem: () => void;
};

function BasketItem({ lineItemData, removeItem }: BasketItemPropsType) {
    const LINE_ITEM_ID = lineItemData.id;
    const BASKET_SERVICE = useRef(new BasketService());
    const [countItem, setCountItem] = useState(Number(lineItemData.quantity));

    // useEffect(() => {
    //     const changeLineItemQuantity = async () => {
    //         await BASKET_SERVICE.current.changeLineItemQuantity(LINE_ITEM_ID, countItem);
    //
    //         const basketResponse = await BASKET_SERVICE.current.getCartById();
    //
    //         console.log(basketResponse, `basketResponse`);
    //     };
    //
    //     changeLineItemQuantity();
    // }, [LINE_ITEM_ID, countItem]);

    const changeLineItemQuantityHandler = async (count: number) => {
        await BASKET_SERVICE.current.changeLineItemQuantity(LINE_ITEM_ID, count);

        const basketResponse = await BASKET_SERVICE.current.getCartById();

        console.log(basketResponse, `basketResponse`);
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
                    {lineItemData.variant.attributes.map((attribute) => (
                        <div key={attribute.name}>
                            <Text classes={["space-grotesk-500-font", "font-size_m", "page-title"]}>
                                {`${attribute.name}: ${attribute.value.key}`}
                            </Text>
                        </div>
                    ))}
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
                        }}
                    />
                </div>
                <Text classes={["inter-600-font", "font-size_l", "page-title"]}>
                    {`$ ${lineItemData.price.value.centAmount / 100}`}
                </Text>
                <button
                    type="button"
                    onClick={async () => {
                        await changeLineItemQuantityHandler(0);
                        removeItem();
                    }}
                >
                    RemoveItem
                </button>
            </div>
        </div>
    );
}

export default BasketItem;
