/* eslint-disable @typescript-eslint/no-unused-vars */
/* import { AuthDataStore } from "service/AuthDataStore";
import axios from "axios";
import AxiosApi from "service/AxiosAnonymousApi";

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

    private readonly CTP_CLIENT_SECRET = "6x4a7bsRL81dJoq1vsQ81yf3C0BiJrYH";

    private readonly CTP_CLIENT_ID = "OLQF6DvQqgu9NiEaNj5l-ngD";

    private readonly ANON_TOKEN_CONTENT_TYPE = "application/x-www-form-urlencoded";

    private readonly ANON_PRODUCTS_CONTENT_TYPE = "application/json";

    private AuthDataStore = AuthDataStore.getAuthDataStore();

    private readonly API_ANON_AUTH_URL = `${this.CTP_AUTH_URL}/oauth/${this.CTP_PROJECT_KEY}/anonymous/token`;

    private requestApi = AxiosApi;

    public async createAnonymousToken(): Promise<void> {
        try {
            const tokenRequest = await this.requestApi.post<TokenResponseType>(
                this.API_ANON_AUTH_URL,
                {
                    params: {
                        grant_type: "client_credentials",
                        scope: `manage_project:uwoc_ecm-app view_audit_log:uwoc_ecm-app manage_api_clients:uwoc_ecm-app`,
                        // scope: `view_published_products:${this.CTP_PROJECT_KEY}`,
                    },
                    headers: {
                        Authorization: `Basic ${btoa(
                            `${this.CTP_CLIENT_ID}:${this.CTP_CLIENT_SECRET}`,
                        )}`,
                        "Content-Type": this.ANON_TOKEN_CONTENT_TYPE,
                    },
                },
            );

            const tokenResponse: TokenResponseType = await tokenRequest.data;
            console.log(tokenResponse, `tokenResponse`);

            const anonymousAccessToken = tokenResponse.access_token;
            const anonymousRefreshToken = tokenResponse.refresh_token;

            this.AuthDataStore.setAnonymousTokens(anonymousAccessToken, anonymousRefreshToken);
        } catch (e) {
            console.log(e);
        }
    }

    private setAnonStorageToStore() {}
} */

import axios, { AxiosResponse } from "axios";
import { AuthDataStore } from "service/AuthDataStore";

type CustomerType = {
    customer: {
        addresses: [];
        authenticationMode: string;
        billingAddressIds: [];
        createdAt: string;
        createdBy: {
            isPlatformClient: boolean;
            user: {
                id: string;
                typeId: string;
            };
        };
        email: string;
        firstName: string;
        id: string;
        isEmailVerified: boolean;
        lastMessageSequenceNumber: number;
        lastModifiedAt: string;
        lastModifiedBy: {
            anonymousId: string;
            clientId: string;
            isPlatformClient: boolean;
        };
        lastName: string;
        middleName: string;
        password: string;
        salutation: string;
        shippingAddressIds: [];
        stores: [];
        title: string;
        version: number;
        versionModifiedAt: string;
    };
};

type DataResponseType = {
    access_token: string;
    expires_in: number;
    token_type: string;
    refresh_token: string;
    scope: string;
};

type LoginType = {
    email: string;
    password: string;
};

export default class LoginService {
    private readonly AUTH_DATA_STORE: AuthDataStore = new AuthDataStore();

    private readonly AUTH_URL: string = "https://auth.europe-west1.gcp.commercetools.com";

    private readonly API_URL: string = "https://api.europe-west1.gcp.commercetools.com";

    private readonly PROJECT_KEY: string = "uwoc_ecm-app";

    private readonly CLIENT_SECRET: string = "E8AYLzgyU7V1edyQweQ9yCxpr2luFops";

    private readonly CLIENT_ID: string = "DzC-BvkGRO8l_GPzpNcR2pzI";

    private readonly SCOPES: string = "manage_project:uwoc_ecm-app";

    private IS_AUTHORIZED = false;

    public getAuthFlag(): boolean {
        return this.IS_AUTHORIZED;
    }

    public async getAuthToken({ email, password }: LoginType): Promise<void> {
        const response: AxiosResponse<DataResponseType> = await axios({
            url: `${this.AUTH_URL}/oauth/${this.PROJECT_KEY}/customers/token`,
            method: "POST",
            data: `grant_type=password&username=${email}&password=${password}&scope=${this.SCOPES}`,
            headers: {
                Authorization: `Basic ${btoa(`${this.CLIENT_ID}:${this.CLIENT_SECRET}`)}`,
                "Content-Type": "application/x-www-form-urlencoded",
            },
        });

        if (response.status === 400) {
            throw Error("User with such credentials was not found");
        }

        const { data } = response;
        this.AUTH_DATA_STORE.setAuthTokens(data.access_token, data.refresh_token);
    }

    public async authenticateCustomer({ email, password }: LoginType): Promise<void> {
        try {
            const ACCESS_TOKEN = this.AUTH_DATA_STORE.getAccessAuthToken();
            const response: AxiosResponse<CustomerType> = await axios({
                url: `${this.API_URL}/${this.PROJECT_KEY}/login`,
                method: "POST",
                data: { email, password },
                headers: {
                    Authorization: `Bearer ${ACCESS_TOKEN}`,
                    "Content-Type": "application/json",
                },
            });

            if (response.status === 200) {
                this.IS_AUTHORIZED = true;
            }

            const { customer } = response.data;

            console.log(customer);
        } catch (error) {
            console.log(error);
        }
    }
}
