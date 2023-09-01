import axios, {
    AxiosInstance,
    AxiosRequestConfig,
    AxiosResponse,
    InternalAxiosRequestConfig,
} from "axios";
import { AuthDataStore } from "service/AuthDataStore/AuthDataStore";
import { AnonymousAccessType } from "service/AxiosAuthService/types";

class AxiosAuthService {
    public request: AxiosInstance;

    private readonly AuthDataStoreApi = new AuthDataStore();

    constructor() {
        this.request = axios.create({
            baseURL: "https://auth.europe-west1.gcp.commercetools.com",
        });
        this.createResponseInterceptor();
    }

    private createResponseInterceptor(): void {
        this.request.interceptors.request.use((config) => {
            const returnConfig = config;
            returnConfig.headers.Authorization = `Basic ${btoa(
                `OLQF6DvQqgu9NiEaNj5l-ngD:6x4a7bsRL81dJoq1vsQ81yf3C0BiJrYH`,
            )}`;

            return returnConfig;
        });

        this.request.interceptors.response.use(
            async (config) => config,

            async (error) => {
                if (axios.isAxiosError(error)) {
                    const originalRequest: InternalAxiosRequestConfig<AxiosInstance> | undefined =
                        error.config;

                    const anonymousAccessToken = this.AuthDataStoreApi.getAnonymousAccessToken();
                    const anonymousRefreshToken = this.AuthDataStoreApi.getAnonymousRefreshToken();

                    if (
                        error.response?.status === 401 &&
                        anonymousAccessToken &&
                        anonymousAccessToken
                    ) {
                        const CTP_CLIENT_SECRET = "6x4a7bsRL81dJoq1vsQ81yf3C0BiJrYH";
                        const CTP_CLIENT_ID = "OLQF6DvQqgu9NiEaNj5l-ngD";

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

                        return this.request(originalRequest || {});
                    }
                }

                return null;
            },
        );
    }

    public post<D>(
        config: AxiosRequestConfig | undefined,
        data: object | undefined = {},
        queryParams: string = "",
    ): Promise<AxiosResponse<D>> {
        return this.request.post(queryParams, data, config);
    }

    public get<D>(url: string, config: AxiosRequestConfig | undefined): Promise<AxiosResponse<D>> {
        return this.request.get(url, config);
    }
}

export default new AxiosAuthService();
