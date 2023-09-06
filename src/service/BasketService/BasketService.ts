import { CartResponseType } from "view/app-components/BasketPage/BasketPage";
import AxiosApiService from "service/AxiosApiService/AxiosApiService";
import { AuthDataStore } from "service/AuthDataStore/AuthDataStore";

export default class BasketService {
    private readonly AXIOS_API_SERVICE = AxiosApiService;

    private readonly AUTH_DATA_STORE = AuthDataStore.getAuthDataStore();

    public async createBasket(): Promise<CartResponseType> {
        const createCartResponse = await this.AXIOS_API_SERVICE.post<CartResponseType>(
            {
                headers: {
                    "Content-Type": "application/json",
                },
            },
            { currency: "USD", anonymousId: localStorage.getItem("anonId") },
            `/carts `,
        );

        localStorage.setItem("cartId", createCartResponse.data.id);
        this.AUTH_DATA_STORE.setBasketVersion(JSON.stringify(createCartResponse.data.version));

        return createCartResponse.data;
    }

    public async getCartById(): Promise<CartResponseType> {
        const getCartResponse = await this.AXIOS_API_SERVICE.get<CartResponseType>(
            {},
            `/carts/${localStorage.getItem("cartId")}`,
        );

        return getCartResponse.data;
    }

    public async addProductToBasket(
        productId: string,
        quantity: number,
    ): Promise<CartResponseType> {
        // const cartData = await this.getCartById();

        const addProductToBasketResponse = await this.AXIOS_API_SERVICE.post<CartResponseType>(
            {
                headers: {
                    "Content-Type": "application/json",
                },
            },

            {
                // version: JSON.stringify(cartData.version),
                version: +this.AUTH_DATA_STORE.getBasketVersion(),
                actions: [
                    {
                        action: "addLineItem",
                        productId: `${productId}`,
                        quantity,
                    },
                ],
            },
            `/carts/${localStorage.getItem("cartId")}`,
        );

        this.AUTH_DATA_STORE.setBasketVersion(
            JSON.stringify(addProductToBasketResponse.data.version),
        );
        return addProductToBasketResponse.data;
    }
}
