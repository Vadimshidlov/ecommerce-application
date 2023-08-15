import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { AuthDataStore } from "service/AuthDataStore";
import LoginService from "service/LoginService";
// import { AuthService } from "service/AuthService";

class AxiosSignUpAuth {
    public request: AxiosInstance;

    private readonly CTP_PROJECT_KEY = "uwoc_ecm-app";

    private readonly API_URL =
        "https://api.europe-west1.gcp.commercetools.com/uwoc_ecm-app/customers";

    private readonly AuthDataStoreApi = AuthDataStore.getAuthDataStore();

    private readonly AuthServiceApi = new LoginService();

    constructor() {
        this.request = axios.create({
            baseURL: `${this.API_URL}`,
        });
        // this.request.interceptors.request.use(
        //     (res) => {
        //         console.log(res);
        //         return res;
        //     },
        //
        //     (error) => {
        //         if (axios.isAxiosError(error)) {
        //             if (error.status === 401) {
        //                 this.AuthDataStoreApi.removeTokenFromStore("anonymousAccessToken");
        //                 this.AuthDataStoreApi.removeTokenFromStore("anonymousRefreshToken");
        //
        //                 this.AuthServiceApi.createAnonymousToken();
        //             }
        //         }
        //     },
        // );
    }

    public post<D>(
        // urlParams: string,
        config: AxiosRequestConfig | undefined,
        data: object | undefined,
        queryParams = "",
    ): Promise<AxiosResponse<D>> {
        return this.request.post(queryParams, data, config);
    }
}

export default new AxiosSignUpAuth();
