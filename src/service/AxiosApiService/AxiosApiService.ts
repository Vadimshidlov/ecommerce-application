/* eslint-disable no-underscore-dangle */
import axios, {
    AxiosInstance,
    AxiosRequestConfig,
    AxiosResponse,
    // InternalAxiosRequestConfig,
} from "axios";
import { AuthDataStore } from "service/AuthDataStore/AuthDataStore";
import { LoginStore } from "service/LoginStore/LoginStore";
import { AccessTokenType } from "service/AxiosApiService/types";
import { AnonymousAccessType } from "service/AxiosAuthService/types";

class AxiosApiService {
    public requestApiInstance: AxiosInstance;

    private readonly AuthDataStoreApi = new AuthDataStore();

    private readonly API_URL = "https://api.europe-west1.gcp.commercetools.com/uwoc_ecm-app/";

    private readonly CTP_CLIENT_SECRET = process.env.REACT_APP_CTP_CLIENT_SECRET ?? "";

    private readonly CTP_CLIENT_ID = process.env.REACT_APP_CTP_CLIENT_ID ?? "";

    constructor() {
        this.requestApiInstance = axios.create({
            baseURL: `${this.API_URL}`,
        });
        this.createRequestInterceptor();
        this.createResponseInterceptor();
    }

    private createResponseInterceptor(): void {
        this.requestApiInstance.interceptors.request.use((config) => {
            const loginStore = LoginStore.getLoginStore();
            const returnConfig = config;

            returnConfig.headers.Authorization = `Bearer ${
                loginStore.isAuth()
                    ? this.AuthDataStoreApi.getAccessAuthToken()
                    : this.AuthDataStoreApi.getAnonymousAccessToken()
            }`;

            return returnConfig;
        });
    }

    private createRequestInterceptor(): void {
        this.requestApiInstance.interceptors.response.use(
            async (config) => config,

            async (error) => {
                const originalRequest = error.config;
                const loginStore = LoginStore.getLoginStore();

                if (loginStore.isAuth() && error.config && !originalRequest._isRetry) {
                    originalRequest._isRetry = true;
                    console.log("inter 1");
                    const authAccessToken = this.AuthDataStoreApi.getAccessAuthToken();
                    const authRefreshToken = this.AuthDataStoreApi.getAuthRefreshToken();

                    if (error.response?.status === 401 && authAccessToken && authRefreshToken) {
                        const response401Token = await axios.post<AccessTokenType>(
                            `https://auth.europe-west1.gcp.commercetools.com/oauth/token`,
                            {},
                            {
                                params: {
                                    grant_type: `refresh_token`,
                                    refresh_token: `${authRefreshToken}`,
                                },
                                headers: {
                                    Authorization: `Basic ${btoa(
                                        `${this.CTP_CLIENT_ID}:${this.CTP_CLIENT_SECRET}`,
                                    )}`,
                                    "Content-Type": "application/x-www-form-urlencoded",
                                },
                            },
                        );

                        this.AuthDataStoreApi.setAuthTokens(
                            response401Token.data.access_token,
                            authRefreshToken,
                        );
                    }

                    return this.requestApiInstance.request(originalRequest);
                }

                if (!loginStore.isAuth() && error.config && !originalRequest._isRetry) {
                    originalRequest._isRetry = true;
                    const anonymousAccessToken = this.AuthDataStoreApi.getAnonymousAccessToken();
                    const anonymousRefreshToken = this.AuthDataStoreApi.getAnonymousRefreshToken();

                    if (
                        error.response?.status === 401 &&
                        anonymousAccessToken &&
                        anonymousRefreshToken
                    ) {
                        originalRequest._isRetry = true;
                        const response401Token = await axios.post<AnonymousAccessType>(
                            `https://auth.europe-west1.gcp.commercetools.com/oauth/token`,
                            {},
                            {
                                params: {
                                    grant_type: `refresh_token`,
                                    refresh_token: `${anonymousRefreshToken}`,
                                },
                                headers: {
                                    Authorization: `Basic ${btoa(
                                        `${this.CTP_CLIENT_ID}:${this.CTP_CLIENT_SECRET}`,
                                    )}`,
                                    "Content-Type": "application/x-www-form-urlencoded",
                                },
                            },
                        );

                        this.AuthDataStoreApi.setAnonymousTokens(
                            response401Token.data.access_token,
                            anonymousRefreshToken,
                        );
                    }

                    return this.requestApiInstance.request(originalRequest);
                }

                throw error;
            },
        );
    }

    public post<D>(
        config: AxiosRequestConfig | undefined,
        data: object | undefined,
        queryParams = "",
    ): Promise<AxiosResponse<D>> {
        return this.requestApiInstance.post(queryParams, data, config);
    }

    public get<D>(
        config: AxiosRequestConfig | undefined,
        queryParams = "",
    ): Promise<AxiosResponse<D>> {
        console.log("AxiosApiService ---> get");
        return this.requestApiInstance.get(queryParams, config);
    }
}

export default new AxiosApiService();
