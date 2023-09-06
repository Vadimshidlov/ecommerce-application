import { AuthDataStore } from "service/AuthDataStore/AuthDataStore";
import AxiosAuthService from "service/AxiosAuthService/AxiosAuthService";
import { TokenResponseType } from "service/AuthService/types";

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

        const scopeString = tokenRequest.data.scope;
        const anonIdArr = scopeString.split(" ");
        console.log(anonIdArr, `anonIdArr`);
        let idResult: string = "";
        anonIdArr.forEach((element) => {
            if (element.startsWith("anonymous_id")) {
                console.log(element);
                element.indexOf(":");
                idResult = element.slice(element.indexOf(":") + 1);
            }
        });
        console.log(idResult, `idResult`);
        if (idResult.length > 0) {
            localStorage.setItem("anonId", idResult);
        }

        const tokenResponse: TokenResponseType = await tokenRequest.data;
        const anonymousAccessToken = tokenResponse.access_token;
        const anonymousRefreshToken = tokenResponse.refresh_token;
        this.AuthDataStoreApi.setAnonymousTokens(anonymousAccessToken, anonymousRefreshToken);
    }
}
