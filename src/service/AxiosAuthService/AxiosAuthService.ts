/* eslint-disable no-underscore-dangle */
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { AuthDataStore } from "service/AuthDataStore/AuthDataStore";
import { AnonymousAccessType } from "service/AxiosAuthService/types";

class AxiosAuthService {
    public requestApiInstance: AxiosInstance;

    private readonly AuthDataStoreApi = new AuthDataStore();

    private readonly CTP_CLIENT_SECRET = process.env.REACT_APP_CTP_CLIENT_SECRET ?? "";

    private readonly CTP_CLIENT_ID = process.env.REACT_APP_CTP_CLIENT_ID ?? "";

    constructor() {
        this.requestApiInstance = axios.create({
            baseURL: "https://auth.europe-west1.gcp.commercetools.com",
        });
        this.createRequestInterceptor();
        this.createResponseInterceptor();
    }

    private createRequestInterceptor(): void {
        this.requestApiInstance.interceptors.request.use((config) => {
            const returnConfig = config;
            returnConfig.headers.Authorization = `Basic ${btoa(
                `${this.CTP_CLIENT_ID}:${this.CTP_CLIENT_SECRET}`,
            )}`;

            return returnConfig;
        });
    }

    public createResponseInterceptor(): void {
        this.requestApiInstance.interceptors.response.use(
            async (config) => config,

            async (error) => {
                const originalRequest = error.config;

                if (axios.isAxiosError(error) && error.config && !originalRequest._isRetry) {
                    originalRequest._isRetry = true;
                    const anonymousAccessToken = this.AuthDataStoreApi.getAnonymousAccessToken();
                    const anonymousRefreshToken = this.AuthDataStoreApi.getAnonymousRefreshToken();

                    if (
                        error.response?.status === 401 &&
                        anonymousAccessToken &&
                        anonymousAccessToken
                    ) {
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

                        return this.requestApiInstance.request(originalRequest);
                    }
                }

                // return null;
                throw error;
            },
        );
    }

    public post<D>(
        config: AxiosRequestConfig | undefined,
        data: object | undefined = {},
        queryParams: string = "",
    ): Promise<AxiosResponse<D>> {
        return this.requestApiInstance.post(queryParams, data, config);
    }

    public get<D>(url: string, config: AxiosRequestConfig | undefined): Promise<AxiosResponse<D>> {
        return this.requestApiInstance.get(url, config);
    }
}

export default new AxiosAuthService();
