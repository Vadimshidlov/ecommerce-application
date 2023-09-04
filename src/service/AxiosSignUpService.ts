import axios, {
    AxiosInstance,
    AxiosRequestConfig,
    AxiosResponse,
    InternalAxiosRequestConfig,
} from "axios";
import { AuthDataStore } from "service/AuthDataStore/AuthDataStore";
import { AnonymousAccessType } from "service/AxiosAuthService/types";
import { LoginStore } from "service/LoginStore/LoginStore";

class AxiosSignUpService {
    public request: AxiosInstance;

    private readonly AuthDataStoreApi = new AuthDataStore();

    private readonly API_URL = "https://api.europe-west1.gcp.commercetools.com/uwoc_ecm-app/";

    constructor() {
        this.request = axios.create({
            baseURL: `${this.API_URL}`,
        });
        this.createResponseInterceptor();
    }

    private createResponseInterceptor(): void {
        this.request.interceptors.request.use((config) => {
            const loginStore = LoginStore.getLoginStore();
            const returnConfig = config;

            returnConfig.headers.Authorization = `Bearer ${
                loginStore.isAuth()
                    ? this.AuthDataStoreApi.getAccessAuthToken()
                    : this.AuthDataStoreApi.getAnonymousAccessToken()
            }`;

            return returnConfig;
        });

        this.request.interceptors.response.use(
            async (config) => config,

            async (error) => {
                if (axios.isAxiosError(error)) {
                    const originalRequest: InternalAxiosRequestConfig<AxiosInstance> | undefined =
                        error.config;
                    const loginStore = LoginStore.getLoginStore();

                    if (loginStore.isAuth()) {
                        const authAccessToken = this.AuthDataStoreApi.getAccessAuthToken();
                        const authRefreshToken = this.AuthDataStoreApi.getAuthRefreshToken();

                        if (error.response?.status === 401 && authAccessToken && authRefreshToken) {
                            const CTP_CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET ?? "";
                            const CTP_CLIENT_ID = process.env.REACT_APP_CTP_CLIENT_ID ?? "";

                            const response401Token = await axios.post<AnonymousAccessType>(
                                `https://auth.europe-west1.gcp.commercetools.com/oauth/token`,
                                {},
                                {
                                    params: {
                                        grant_type: `refresh_token`,
                                        refresh_token: `${authRefreshToken}`,
                                    },
                                    headers: {
                                        Authorization: `Basic ${btoa(
                                            `${CTP_CLIENT_ID}:${CTP_CLIENT_SECRET}`,
                                        )}`,
                                        "Content-Type": "application/x-www-form-urlencoded",
                                    },
                                },
                            );

                            this.AuthDataStoreApi.setAnonymousTokens(
                                response401Token.data.access_token,
                                authRefreshToken,
                            );
                        }
                    } else if (!loginStore.isAuth()) {
                        const anonymousAccessToken =
                            this.AuthDataStoreApi.getAnonymousAccessToken();
                        const anonymousRefreshToken =
                            this.AuthDataStoreApi.getAnonymousRefreshToken();

                        if (
                            error.response?.status === 401 &&
                            anonymousAccessToken &&
                            anonymousRefreshToken
                        ) {
                            const CTP_CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET ?? "";
                            const CTP_CLIENT_ID = process.env.REACT_APP_CTP_CLIENT_ID ?? "";

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
                                            `${CTP_CLIENT_ID}:${CTP_CLIENT_SECRET}`,
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
                    }

                    return this.request(originalRequest || {});
                }

                return null;
            },
        );
    }

    public post<D>(
        config: AxiosRequestConfig | undefined,
        data: object | undefined,
        queryParams = "",
    ): Promise<AxiosResponse<D>> {
        return this.request.post(queryParams, data, config);
    }

    public get<D>(
        config: AxiosRequestConfig | undefined,
        queryParams = "",
    ): Promise<AxiosResponse<D>> {
        return this.request.get(queryParams, config);
    }
}

export default new AxiosSignUpService();
