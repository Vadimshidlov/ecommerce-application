/* eslint-disable @typescript-eslint/no-unused-vars */
import { AuthDataStore } from "service/AuthDataStore";
import axios from "axios";
import AxiosApi from "service/Axios";

type TokenResponseType = {
    access_token: string;
    expires_in: number;
    token_type: string;
    scope: string;
    refresh_token: string;
};

type GetAnonTokenType =
    `anonymous/token?grant_type=client_credentials&scope=view_published_products`;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export class AuthService {
    private readonly CTP_AUTH_URL = "https://auth.europe-west1.gcp.commercetools.com";

    private readonly CTP_API_URL = "https://api.europe-west1.gcp.commercetools.com";

    private readonly CTP_PROJECT_KEY = "uwoc_ecm-app";

    private readonly CTP_CLIENT_SECRET = "y032J9wD2H8uGq-teCj3JKufLemXvh0p";

    private readonly CTP_CLIENT_ID = "AQQJMS72dVvIXZ8egyoOukZU";

    private readonly ANON_TOKEN_CONTENT_TYPE = "application/x-www-form-urlencoded";

    private readonly ANON_PRODUCTS_CONTENT_TYPE = "application/json";

    private AuthDataStore = AuthDataStore.getAuthDataStore();

    private requestApi = AxiosApi;

    public async createAnonymousToken(): Promise<void> {
        try {
            const tokenRequest = await this.requestApi.post<TokenResponseType>({
                params: {
                    grant_type: "client_credentials",
                    scope: `view_published_products:uwoc_ecm-app manage_customers:uwoc_ecm-app manage_my_profile:uwoc_ecm-app manage_my_orders:uwoc_ecm-app create_anonymous_token:uwoc_ecm-app`,
                    // scope: `view_published_products:${this.CTP_PROJECT_KEY}`,
                },
                headers: {
                    Authorization: `Basic ${btoa(
                        `${this.CTP_CLIENT_ID}:${this.CTP_CLIENT_SECRET}`,
                    )}`,
                    "Content-Type": this.ANON_TOKEN_CONTENT_TYPE,
                },
            });

            const tokenResponse: TokenResponseType = await tokenRequest.data;
            const anonymousToken = tokenResponse.access_token;
            const anonymousRefreshToken = tokenResponse.refresh_token;

            this.AuthDataStore.setAnonymousToken(anonymousToken);
            this.AuthDataStore.setAnonymousRefreshToken(anonymousRefreshToken);
        } catch (e) {
            console.log(e);
        }
    }

    private setAnonStorageToStore() {}
}
