import { useEffect, useRef, useState } from "react";
import AxiosSignUpService from "service/AxiosApiService/AxiosApiService";
import { ProductResponseType } from "view/app-components/ProductPage/types";

export type CategoryNameType = {
    id: string;
    name: {
        "en-US": string;
    };
};

function useGetProductDate(id: string = "c97e1aa9-08e0-4b77-aca5-b306c3eabb81") {
    const axiosApi = useRef(AxiosSignUpService);
    const [productData, setProductData] = useState<ProductResponseType>();

    useEffect(() => {
        const getProducts = async () => {
            try {
                // const axiosApi = AxiosSignUpService;
                const productResponse = await axiosApi.current.get<ProductResponseType>(
                    {},
                    `/product-projections/${id}`,
                );

                setProductData(productResponse.data);
            } catch (e) {
                console.error(e);
            }
        };

        getProducts();
    }, [id]);

    return { productData };
}

export default useGetProductDate;
