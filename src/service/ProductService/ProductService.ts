import { AxiosResponse } from "axios";
import { AuthDataStore } from "service/AuthDataStore/AuthDataStore";
import { AuthService } from "service/AuthService/AuthService";
import AxiosApiService from "service/AxiosApiService/AxiosApiService";
import { CategoryResponse } from "view/app-components/ShopPage/types";

export default class ProductService {
    private readonly AUTH_DATA_STORE: AuthDataStore = new AuthDataStore();

    private readonly AUTH_SERVICE: AuthService = new AuthService();

    private readonly API_URL: string = "https://api.europe-west1.gcp.commercetools.com";

    private readonly PROJECT_KEY: string = "uwoc_ecm-app";

    private CATEGORIE_ID: string = "";

    private AXIOS_API = AxiosApiService;

    public async getCategoryByKey(key: string): Promise<AxiosResponse> {
        const response = await this.AXIOS_API.get<CategoryResponse>({}, `/categories/key=${key}`);

        this.CATEGORIE_ID = response.data.id;

        return response;
    }

    public async getAllProducts(): Promise<AxiosResponse> {
        const response = await this.AXIOS_API.get<CategoryResponse>(
            {},
            `/product-projections/search`,
        );

        return response;
    }

    public async getProductsByCategoriId(): Promise<AxiosResponse> {
        const response = await this.AXIOS_API.get<CategoryResponse>(
            {
                params: {
                    filter: `categories.id:"${this.CATEGORIE_ID}"`,
                },
            },
            `/product-projections/search`,
        );

        return response;
    }

    public async getProductURL(param: string): Promise<AxiosResponse> {
        const response = await this.AXIOS_API.get<CategoryResponse>(
            {
                headers: {
                    "Content-Type": "application/json",
                },
            },
            `/product-projections/search?${param}`,
        );

        return response;
    }
}
