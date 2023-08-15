import axios, { AxiosResponse } from "axios";

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
    private readonly AUTH_URL = "https://auth.europe-west1.gcp.commercetools.com";

    private readonly API_URL = "https://api.europe-west1.gcp.commercetools.com";

    private readonly PROJECT_KEY = "uwoc_ecm-app";

    private readonly CLIENT_SECRET = "E8AYLzgyU7V1edyQweQ9yCxpr2luFops";

    private readonly CLIENT_ID = "DzC-BvkGRO8l_GPzpNcR2pzI";

    private readonly SCOPES = "manage_project:uwoc_ecm-app";

    private ACCESS_TOKEN = "";

    private REFRESH_TOKEN = "";

    private IS_AUTHORIZED = false;

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
        this.ACCESS_TOKEN = data.access_token;
        this.REFRESH_TOKEN = data.refresh_token;
    }

    public async authenticateCustomer({ email, password }: LoginType): Promise<void> {
        const response: AxiosResponse<CustomerType> = await axios({
            url: `${this.API_URL}/${this.PROJECT_KEY}/login`,
            method: "POST",
            data: { email, password },
            headers: {
                Authorization: `Bearer ${this.ACCESS_TOKEN}`,
                "Content-Type": "application/json",
            },
        });

        if (response.status === 200) {
            this.IS_AUTHORIZED = true;
        }

        const { customer } = response.data;

        console.log(customer);
        // return customer;
    }

    // public async authenticateCustomer({ email, password }: LoginType): Promise<CustomerType> {
    //     const URL: string = `${this.API_URL}/${this.PROJECT_KEY}/login`;
    //     const BODY: LoginType = { email, password };

    //     const response = await fetch(URL, {
    //         method: "POST",
    //         headers: {
    //             Authorization: `Bearer ${this.ACCESS_TOKEN}`,
    //             "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify(BODY),
    //     });

    //     const customer: CustomerType = await response.json();

    //     console.log(customer);
    //     return customer;
    // }
}
