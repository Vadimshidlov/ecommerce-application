import { useEffect, useRef, useState } from "react";
import AxiosSignUpService from "service/AxiosApiService/AxiosApiService";
import { ProductResponseType } from "view/app-components/ProductPage/types";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BasketService from "service/BasketService/BasketService";
import { BasketResponseType } from "view/app-components/BasketPage/BasketPage";

export type CategoryNameType = {
    id: string;
    name: {
        "en-US": string;
    };
};

export type ProductVariantsBasketState = { [key: number]: boolean };

function useGetProductDate(variantId: number, id: string = "c97e1aa9-08e0-4b77-aca5-b306c3eabb81") {
    const axiosApi = useRef(AxiosSignUpService);
    const BASKET_SERVICE = useRef(new BasketService());

    const [productData, setProductData] = useState<ProductResponseType>();
    const [basketProductData, setBasketProductData] = useState<BasketResponseType>();
    const [isInBasket, setIsInBasket] = useState<boolean>(false);
    const [lineItemId, setLineItemId] = useState<string>("");
    const [basketQuantity, setBasketQuantity] = useState<number>(1);
    const [productVariantState, setProductVariantState] = useState<ProductVariantsBasketState>({});
    const navigate = useNavigate();

    useEffect(() => {
        const getProducts = async () => {
            try {
                const productResponse = await axiosApi.current.get<ProductResponseType>(
                    {},
                    `/product-projections/${id}`,
                );

                const basketResponse = await BASKET_SERVICE.current.getCartById();
                setBasketProductData(basketResponse);

                basketResponse.lineItems.forEach((lineItem) => {
                    const productId = productResponse.data.id;

                    if (productId === lineItem.productId) {
                        if (variantId === lineItem.variant.id) {
                            setLineItemId(lineItem.id);
                        }

                        setProductVariantState((prevState) => ({
                            ...prevState,
                            [lineItem.variant.id]: true,
                        }));
                    }
                });

                setProductData(productResponse.data);
            } catch (error) {
                if (axios.isAxiosError(error) && error?.response?.status === 404) {
                    navigate("*");
                }
                console.error(error);
            }
        };

        getProducts();
    }, [id, navigate, isInBasket, lineItemId, variantId]);

    const setIsInBasketHandler = async (value: boolean) => {
        setIsInBasket(value);

        setBasketQuantity(1);
    };

    return {
        productData,
        isInBasket,
        setIsInBasketHandler,
        lineItemId,
        basketProductData,
        setLineItemId,
        basketQuantity,
        productVariantState,
        setProductVariantState,
    };
}

export default useGetProductDate;
