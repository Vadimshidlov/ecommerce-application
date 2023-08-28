import axios, { AxiosResponse } from "axios";
import { AuthDataStore } from "service/AuthDataStore";

export default class ProductService {
    private readonly AUTH_DATA_STORE: AuthDataStore = new AuthDataStore();

    private readonly API_URL: string = "https://api.europe-west1.gcp.commercetools.com";

    private readonly PROJECT_KEY: string = "uwoc_ecm-app";

    private CATEGORIE_ID: string = "";

    public async getCategoryByKey(key: string): Promise<void> {
        const token =
            this.AUTH_DATA_STORE.getAccessAuthToken() ||
            this.AUTH_DATA_STORE.getAnonymousAccessToken();

        const response: AxiosResponse = await axios({
            url: `${this.API_URL}/${this.PROJECT_KEY}/categories/key=${key}`,
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });

        this.CATEGORIE_ID = response.data.id;
    }

    public async getAllProducts(): Promise<AxiosResponse> {
        const token =
            this.AUTH_DATA_STORE.getAccessAuthToken() ||
            this.AUTH_DATA_STORE.getAnonymousAccessToken();

        const response: AxiosResponse = await axios({
            url: `${this.API_URL}/${this.PROJECT_KEY}/product-projections/search`,
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });

        return response;
    }

    public async getProductsByCategoriId(): Promise<AxiosResponse> {
        const token =
            this.AUTH_DATA_STORE.getAccessAuthToken() ||
            this.AUTH_DATA_STORE.getAnonymousAccessToken();

        const response: AxiosResponse = await axios({
            url: `${this.API_URL}/${this.PROJECT_KEY}/product-projections/search`,
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            params: {
                filter: `categories.id:"${this.CATEGORIE_ID}"`,
            },
        });

        return response;
    }
}
