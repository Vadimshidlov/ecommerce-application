/* eslint-disable @typescript-eslint/no-unused-vars */
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

function useGetProductDate(id: string = "c97e1aa9-08e0-4b77-aca5-b306c3eabb81") {
    const axiosApi = useRef(AxiosSignUpService);
    const BASKET_SERVICE = useRef(new BasketService());

    const [productData, setProductData] = useState<ProductResponseType>();
    const navigate = useNavigate();

    useEffect(() => {
        const getProducts = async () => {
            try {
                const productResponse = await axiosApi.current.get<ProductResponseType>(
                    {},
                    `/product-projections/${id}`,
                );

                setProductData(productResponse.data);
            } catch (error) {
                if (axios.isAxiosError(error) && error?.response?.status === 404) {
                    navigate("*");
                }
                console.error(error);
            }
        };

        getProducts();
    }, [id, navigate]);

    return {
        productData,
    };
}

export default useGetProductDate;
