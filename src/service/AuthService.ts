import { AuthDataStore } from "service/AuthDataStore";
import AxiosAuthService from "service/AxiosAuthService";

type TokenResponseType = {
    access_token: string;
    expires_in: number;
    token_type: string;
    scope: string;
    refresh_token: string;
};

export class AuthService {
    private readonly CTP_AUTH_URL = "https://auth.europe-west1.gcp.commercetools.com";

    private readonly CTP_PROJECT_KEY = "uwoc_ecm-app";

    private readonly ANON_TOKEN_CONTENT_TYPE = "application/x-www-form-urlencoded";

    private AuthDataStoreApi = AuthDataStore.getAuthDataStore();

    private AxiosAuthServiceApi = AxiosAuthService;

    public async createAnonymousToken(): Promise<void> {
        const tokenRequest = await this.AxiosAuthServiceApi.post<TokenResponseType>(
            {
                params: {
                    grant_type: "client_credentials",
                    scope: `manage_project:uwoc_ecm-app view_audit_log:uwoc_ecm-app manage_api_clients:uwoc_ecm-app`,
                },
                headers: {
                    "Content-Type": this.ANON_TOKEN_CONTENT_TYPE,
                },
            },
            {},
            `oauth/${this.CTP_PROJECT_KEY}/anonymous/token`,
        );

        const tokenResponse: TokenResponseType = await tokenRequest.data;
        const anonymousAccessToken = tokenResponse.access_token;
        const anonymousRefreshToken = tokenResponse.refresh_token;
        this.AuthDataStoreApi.setAnonymousTokens(anonymousAccessToken, anonymousRefreshToken);
    }
}
