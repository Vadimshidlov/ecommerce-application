import React, { useRef, useState } from "react";
import { Button } from "shared/components/button/Button";
import { TextInput } from "shared/components/TextInput/TextInput";
import BasketService from "service/BasketService/BasketService";
import * as yup from "yup";
import { promoCodeErrorMessage, promoCodeSuccessMessage } from "shared/utils/notifyMessages";
import {
    BasketResponseType,
    DiscountCodesRemoveType,
} from "view/app-components/BasketPage/BasketPage";

export const promoCodeScheme = yup.object({
    promocode: yup
        .string()
        .required("Please, write your promo code")
        .min(3, "Very short promo code")
        .max(20, "Very length promo code"),
});

export type BasketPromoPropsType = {
    basketData: BasketResponseType;
    getBasketHandler: () => void;
};

function BasketPromo({ basketData, getBasketHandler }: BasketPromoPropsType) {
    const BASKET_SERVICE = useRef(new BasketService());
    const [promoCode, setPromoCode] = useState<string>("");
    const [promoError, setPromoError] = useState({
        promocodeError: "",
    });

    const promoCodeChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setPromoCode(value);
    };

    const promoCodeSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            if (promoCode === "") {
                setPromoError({
                    promocodeError: "Input is required field",
                });

                return;
            }

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

            await BASKET_SERVICE.current.addPromoCode(promoCode);

            promoCodeSuccessMessage();
            setPromoCode("");
            getBasketHandler();
        } catch (error) {
            setPromoCode("");
            promoCodeErrorMessage();
        }
    };

    return (
        <div>
            <form className="promo-code__form" onSubmit={promoCodeSubmitHandler}>
                <TextInput
                    type="text"
                    name="promocode"
                    onChange={promoCodeChangeHandler}
                    onFocus={() => {
                        setPromoError({
                            promocodeError: "",
                        });
                    }}
                    id="pcode"
                    value={promoCode}
                    placeholder="Write your promo code..."
                    validationError={promoError.promocodeError || ""}
                />
                <Button
                    type="submit"
                    text="Apply"
                    textClasses={["space-grotesk-500-font", "font-size_l", "color_white"]}
                    buttonClasses="promo-code__button"
                />
            </form>
        </div>
    );
}

export default BasketPromo;
