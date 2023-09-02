import axios, { AxiosResponse } from "axios";
import { AuthDataStore } from "service/AuthDataStore/AuthDataStore";
import { AuthService } from "service/AuthService/AuthService";
// import { QueryParamsType } from "view/app-components/ShopPage/Filter/Filter";

export default class ProductService {
    private readonly AUTH_DATA_STORE: AuthDataStore = new AuthDataStore();

    private readonly AUTH_SERVICE: AuthService = new AuthService();

    // private request: AxiosInstance;

    private readonly API_URL: string = "https://api.europe-west1.gcp.commercetools.com";

    private readonly PROJECT_KEY: string = "uwoc_ecm-app";

    private CATEGORIE_ID: string = "";

    // constructor() {
    //     // this.request = axios.create({});
    //     this.runInterceptor();
    // }

    // public runInterceptor() {
    //     axios.interceptors.request.use(async (config) => {
    //         console.log("run");
    //         const token =
    //             this.AUTH_DATA_STORE.getAccessAuthToken() ||
    //             this.AUTH_DATA_STORE.getAnonymousAccessToken();

    //         console.log(token);

    //         if (!token) {
    //             console.log("token is failed");
    //             // this.AUTH_SERVICE.createAnonymousToken();
    //         }

    //         return config;
    //     });
    // }

    public async getCategoryByKey(key: string): Promise<AxiosResponse> {
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
        return response;
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

    // public async getProduct(filter: QueryParamsType): Promise<AxiosResponse> {
    //     const token =
    //         this.AUTH_DATA_STORE.getAccessAuthToken() ||
    //         this.AUTH_DATA_STORE.getAnonymousAccessToken();

    //     const response: AxiosResponse = await axios({
    //         url: `${this.API_URL}/${this.PROJECT_KEY}/product-projections/search`,
    //         method: "GET",
    //         headers: {
    //             Authorization: `Bearer ${token}`,
    //             "Content-Type": "application/json",
    //         },
    //         params: filter,
    //     });

    //     return response;
    // }

    public async getProductURL(path: string): Promise<AxiosResponse> {
        const token =
            this.AUTH_DATA_STORE.getAccessAuthToken() ||
            this.AUTH_DATA_STORE.getAnonymousAccessToken();

        const response: AxiosResponse = await axios({
            url: `${this.API_URL}/${this.PROJECT_KEY}/product-projections/search?${path}`,
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });

        return response;
    }
}
