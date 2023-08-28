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

        if (response.status !== 200) {
            throw Error("User with such credentials was not found");
        }
    }

    // public async getProductsProjections(): Promise<void> {
    //     const response: AxiosResponse<CustomerType> = await axios({
    //         url: `${this.API_URL}/${this.PROJECT_KEY}/login`,
    //         method: "POST",
    //         data: { email, password },
    //         headers: {
    //             Authorization: `Bearer ${ACCESS_TOKEN}`,
    //             "Content-Type": "application/json",
    //         },
    //     });
    // }
}
