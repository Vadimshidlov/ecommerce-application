import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

class AxiosAnonymousFlow {
    public request: AxiosInstance;

    private readonly CTP_PROJECT_KEY = "uwoc_ecm-app";

    private readonly CTP_AUTH_URL = "https://auth.europe-west1.gcp.commercetools.com";

    private readonly API_URL = `${this.CTP_AUTH_URL}/oauth/${this.CTP_PROJECT_KEY}/anonymous/token`;

    constructor() {
        this.request = axios.create({});
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
