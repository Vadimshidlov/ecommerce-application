/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useRef, useState } from "react";
import AxiosSignUpService from "service/AxiosApiService/AxiosApiService";
import { ProductResponseType } from "view/app-components/ProductPage/types";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BasketService from "service/BasketService/BasketService";
import { BasketResponseType } from "view/app-components/BasketPage/BasketPage";
import BasketStore from "store/basket-store";

export type CategoryNameType = {
    id: string;
    name: {
        "en-US": string;
    };
};

export type ProductVariantsBasketState = { [key: number]: boolean };

function useGetProductBasketData(
    variantId: number,
    productId: string = "c97e1aa9-08e0-4b77-aca5-b306c3eabb81",
) {
    const axiosApi = useRef(AxiosSignUpService);
    const BASKET_SERVICE = useRef(new BasketService());

    const [basketProductData, setBasketProductData] = useState<BasketResponseType>();
    const [lineItemId, setLineItemId] = useState<string>("");
    const [basketQuantity, setBasketQuantity] = useState<number>(1);
    const [productVariantState, setProductVariantState] = useState<ProductVariantsBasketState>({});
    const navigate = useNavigate();
    const { updateBasketStore, basketStoreData } = BasketStore;

    useEffect(() => {
        const getProducts = async () => {
            try {
                const basketResponse = await BASKET_SERVICE.current.getCartById();
                setBasketProductData(basketResponse);
                updateBasketStore(basketResponse);
            } catch (error) {
                if (axios.isAxiosError(error) && error?.response?.status === 404) {
                    navigate("*");
                }
                console.error(error);
            }
        };

        getProducts();
    }, [navigate, updateBasketStore]);

    useEffect(() => {
        if (basketStoreData) {
            basketStoreData.lineItems.forEach((lineItem) => {
                if (productId === lineItem.productId) {
                    if (variantId === lineItem.variant.id) {
                        setLineItemId(lineItem.id);
                        setBasketQuantity(lineItem.quantity);

                        setProductVariantState((prevState) => ({
                            ...prevState,
                            [lineItem.variant.id]: true,
                        }));
                    }
                }
            });
        }
    }, [basketStoreData, productId, variantId]);

    return {
        lineItemId,
        basketProductData,
        setLineItemId,
        basketQuantity,
        productVariantState,
        setProductVariantState,
        setBasketProductData,
    };
}

export default useGetProductBasketData;
