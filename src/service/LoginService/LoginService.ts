import { AuthDataStore } from "service/AuthDataStore/AuthDataStore";
import AxiosAuthService from "service/AxiosAuthService/AxiosAuthService";
import AxiosSignUpService from "service/AxiosApiService/AxiosApiService";
import { CustomerType, DataResponseType, LoginType } from "service/LoginService/types";

export default class LoginService {
    private readonly AUTH_DATA_STORE: AuthDataStore = new AuthDataStore();

    private readonly PROJECT_KEY: string = "uwoc_ecm-app";

    private readonly SCOPES: string = "manage_project:uwoc_ecm-app";

    private AxiosAuthServiceApi = AxiosAuthService;

    private AxiosSignUpServiceApi = AxiosSignUpService;

    public async getAuthToken({ email, password }: LoginType): Promise<void> {
        const response = await this.AxiosAuthServiceApi.post<DataResponseType>(
            {
                params: {
                    grant_type: "password",
                    username: `${email}`,
                    password: `${password}`,
                    scope: `${this.SCOPES}`,
                },
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            },
            {},
            `oauth/${this.PROJECT_KEY}/customers/token`,
        );

        if (response.status === 400) {
            throw Error("User with such credentials was not found");
        }

        const { data } = response;
        this.AUTH_DATA_STORE.setAuthTokens(data.access_token, data.refresh_token);
    }

    public async authenticateCustomer({ email, password }: LoginType): Promise<void> {
        const response = await this.AxiosSignUpServiceApi.post<CustomerType>(
            {
                headers: {
                    "Content-Type": "application/json",
                },
            },
            { email, password },
            "/login",
        );

        if (response.status !== 200) {
            throw Error("User with such credentials was not found");
        }
    }
}
