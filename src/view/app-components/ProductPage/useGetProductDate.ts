import { useEffect, useState } from "react";
import AxiosSignUpService from "service/AxiosApiService/AxiosApiService";
import { ProductResponseType } from "view/app-components/ProductPage/types";

function useGetProductDate() {
    const [productData, setProductData] = useState<ProductResponseType>();

    useEffect(() => {
        const getProducts = async () => {
            try {
                const axiosApi = AxiosSignUpService;
                const productResponse = await axiosApi.get<ProductResponseType>(
                    {},
                    "/product-projections/b781ba58-ed3c-42c4-9f63-de9146939a17",
                    // "/product-projections/c97e1aa9-08e0-4b77-aca5-b306c3eabb81",
                );
                setProductData(productResponse.data);
            } catch (e) {
                console.error(e);
            }
        };

        getProducts();
    }, []);

    return productData;
}

export default useGetProductDate;
