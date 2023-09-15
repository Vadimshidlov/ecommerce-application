import { BasketResponseType } from "view/app-components/BasketPage/BasketPage";
import AxiosApiService from "service/AxiosApiService/AxiosApiService";
import { AuthDataStore } from "service/AuthDataStore/AuthDataStore";

export type ClearBasketActionsType = {
    action: string;
    lineItemId: string;
    quantity: number;
};

export default class BasketService {
    private readonly AXIOS_API_SERVICE = AxiosApiService;

    private readonly AUTH_DATA_STORE = AuthDataStore.getAuthDataStore();

    public async createBasket(): Promise<BasketResponseType> {
        const createCartResponse = await this.AXIOS_API_SERVICE.post<BasketResponseType>(
            {
                headers: {
                    "Content-Type": "application/json",
                },
            },
            { currency: "USD", anonymousId: localStorage.getItem("anonId") },
            `me/carts `,
        );

        localStorage.setItem("cartId", createCartResponse.data.id);
        this.AUTH_DATA_STORE.setBasketVersion(JSON.stringify(createCartResponse.data.version));

        return createCartResponse.data;
    }

    public async getActiveCart(): Promise<BasketResponseType> {
        const getActiveCartResponse = await this.AXIOS_API_SERVICE.get<BasketResponseType>(
            {},
            `me/active-cart`,
        );

        console.log(getActiveCartResponse, `getActiveCartResponse`);
        localStorage.setItem("cartId", getActiveCartResponse.data.id);
        this.AUTH_DATA_STORE.setBasketVersion(JSON.stringify(getActiveCartResponse.data.version));

        return getActiveCartResponse.data;
    }

    public async getCartById(): Promise<BasketResponseType> {
        const getCartResponse = await this.AXIOS_API_SERVICE.get<BasketResponseType>(
            {},
            `me/carts/${localStorage.getItem("cartId")}`,
        );

        return getCartResponse.data;
    }

    public async addProductToBasket(
        productId: string,
        quantity: number,
        variantId: number,
    ): Promise<BasketResponseType> {
        const addProductToBasketResponse = await this.AXIOS_API_SERVICE.post<BasketResponseType>(
            {
                headers: {
                    "Content-Type": "application/json",
                },
            },

            {
                version: +this.AUTH_DATA_STORE.getBasketVersion(),
                actions: [
                    {
                        action: "addLineItem",
                        productId: `${productId}`,
                        variantId,
                        quantity,
                    },
                ],
            },
            `me/carts/${localStorage.getItem("cartId")}`,
        );

        this.AUTH_DATA_STORE.setBasketVersion(
            JSON.stringify(addProductToBasketResponse.data.version),
        );

        return addProductToBasketResponse.data;
    }

    public async removeProductFromBasket(
        lineItemId: string,
        quantity: number,
        variantId: number,
    ): Promise<BasketResponseType> {
        const addProductToBasketResponse = await this.AXIOS_API_SERVICE.post<BasketResponseType>(
            {
                headers: {
                    "Content-Type": "application/json",
                },
            },

            {
                version: +this.AUTH_DATA_STORE.getBasketVersion(),
                actions: [
                    {
                        action: "removeLineItem",
                        lineItemId,
                        variantId,
                        quantity,
                    },
                ],
            },
            `me/carts/${localStorage.getItem("cartId")}`,
        );

        this.AUTH_DATA_STORE.setBasketVersion(
            JSON.stringify(addProductToBasketResponse.data.version),
        );

        return addProductToBasketResponse.data;
    }

    public async changeLineItemQuantity(
        lineItemId: string,
        quantity: number,
    ): Promise<BasketResponseType> {
        const addProductToBasketResponse = await this.AXIOS_API_SERVICE.post<BasketResponseType>(
            {
                headers: {
                    "Content-Type": "application/json",
                },
            },

            {
                version: +this.AUTH_DATA_STORE.getBasketVersion(),
                actions: [
                    {
                        action: "changeLineItemQuantity",
                        lineItemId,
                        quantity,
                    },
                ],
            },
            `me/carts/${localStorage.getItem("cartId")}`,
        );

        this.AUTH_DATA_STORE.setBasketVersion(
            JSON.stringify(addProductToBasketResponse.data.version),
        );
        return addProductToBasketResponse.data;
    }

    public async removeLineItemsFromBasket(
        actions: ClearBasketActionsType[],
    ): Promise<BasketResponseType> {
        const removeLineItemsFromBasketResponse =
            await this.AXIOS_API_SERVICE.post<BasketResponseType>(
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                },

                {
                    version: +this.AUTH_DATA_STORE.getBasketVersion(),
                    actions,
                },
                `me/carts/${localStorage.getItem("cartId")}`,
            );

        this.AUTH_DATA_STORE.setBasketVersion(
            JSON.stringify(removeLineItemsFromBasketResponse.data.version),
        );

        return removeLineItemsFromBasketResponse.data;
    }
}
