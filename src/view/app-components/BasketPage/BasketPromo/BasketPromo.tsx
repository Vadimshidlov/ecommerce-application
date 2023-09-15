import React, { useRef } from "react";
import TextValidationError from "view/app-components/Registration/components/ErrorsComponents/TextValidationError";
import { Button } from "shared/components/button/Button";
import { TextInput } from "shared/components/TextInput/TextInput";
import BasketService from "service/BasketService/BasketService";

export type BasketPromoPropsType = {
    promoCode: string;
    setPromoCode: React.Dispatch<React.SetStateAction<string>>;
};

function BasketPromo({ promoCode, setPromoCode }: BasketPromoPropsType) {
    const BASKET_SERVICE = useRef(new BasketService());

    const promoCodeChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setPromoCode(value);
    };

    const promoCodeSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            BASKET_SERVICE.current.addPromoCode(promoCode);
            console.log("Promo Code Submit");
        } catch (error) {
            console.log(error);
            setPromoCode("");
        }
    };

    return (
        <div>
            <form className="promo-code__form" onSubmit={promoCodeSubmitHandler}>
                <TextInput
                    type="text"
                    name="firstname"
                    onChange={promoCodeChangeHandler}
                    // onFocus={inputOnFocusHandler}
                    id="fname"
                    value={promoCode}
                    placeholder="Write your promo code..."
                    validationError=""
                />
                <TextValidationError errorMessage="" />
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
