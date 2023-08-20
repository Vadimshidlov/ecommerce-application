import axios, {
    AxiosInstance,
    AxiosRequestConfig,
    AxiosResponse,
    InternalAxiosRequestConfig,
} from "axios";
import { AuthDataStore } from "service/AuthDataStore";

export type AnonymousAccessType = {
    access_token: string;
    expires_in: number;
    scope: string;
    token_type: string;
};

class AxiosAnonymousFlow {
    public request: AxiosInstance;

    private readonly CTP_PROJECT_KEY = "uwoc_ecm-app";

    private readonly CTP_AUTH_URL = "https://auth.europe-west1.gcp.commercetools.com";

    private readonly API_URL = `${this.CTP_AUTH_URL}/oauth/${this.CTP_PROJECT_KEY}/anonymous/token`;

    private readonly AuthDataStoreApi = new AuthDataStore();

    constructor() {
        this.request = axios.create({
            // headers: {
            //     Authorization: `Basic ${localStorage.getItem("anonymousAccessToken")}`,
            // },
        });
        this.createResponseInterceptor();
    }

    private createResponseInterceptor(): void {
        this.request.interceptors.request.use((config) => {
            const returnConfig = config;
            returnConfig.headers.Authorization = `Bearer ${this.AuthDataStoreApi.getAnonymousAccessToken()}`;

            return returnConfig;
        });

        this.request.interceptors.response.use(
            async (config) => config,

            async (error) => {
                if (axios.isAxiosError(error)) {
                    console.log("anonymousAccessToken_401_interceptor");
                    const originalRequest: InternalAxiosRequestConfig<AxiosInstance> | undefined =
                        error.config;

                    const anonymousAccessToken = this.AuthDataStoreApi.getAnonymousAccessToken();
                    const anonymousRefreshToken = this.AuthDataStoreApi.getAnonymousRefreshToken();

                    if (
                        error.response?.status === 401 &&
                        anonymousAccessToken &&
                        anonymousAccessToken
                    ) {
                        try {
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

                            console.log(response401Token);
                            console.log(response401Token.data.access_token, `access_token`);

                            return await this.request(originalRequest || {});
                        } catch (e) {
                            console.log(e);
                        }
                    }
                }

                return null;
            },
        );
    }

    public post<D>(
        url: string,
        config: AxiosRequestConfig | undefined,
        data: object | undefined = {},
    ): Promise<AxiosResponse<D>> {
        return this.request.post(url, data, config);
    }

    public get<D>(url: string, config: AxiosRequestConfig | undefined): Promise<AxiosResponse<D>> {
        return this.request.get(url, config);
    }
}

export default new AxiosAnonymousFlow();
