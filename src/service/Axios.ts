import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

class AxiosAuthApi {
    public request: AxiosInstance;

    private readonly CTP_PROJECT_KEY = "uwoc_ecm-app";

    private readonly CTP_AUTH_URL = "https://auth.europe-west1.gcp.commercetools.com";

    private readonly API_URL = `${this.CTP_AUTH_URL}/oauth/${this.CTP_PROJECT_KEY}/anonymous/token`;

    constructor() {
        this.request = axios.create({
            url: `https://auth.europe-west1.gcp.commercetools.com/oauth/${this.CTP_PROJECT_KEY}/anonymous/token`,
        });
    }

    public post<D>(
        config: AxiosRequestConfig | undefined,
        data: object | undefined = {},
    ): Promise<AxiosResponse<D>> {
        return this.request.post(this.API_URL, data, config);
    }
}

export default new AxiosAuthApi();
