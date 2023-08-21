import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

class AxiosSignUpFlow {
    public request: AxiosInstance;

    private readonly API_URL =
        "https://api.europe-west1.gcp.commercetools.com/uwoc_ecm-app/customers";

    constructor() {
        this.request = axios.create({
            baseURL: `${this.API_URL}`,
        });
    }

    public post<D>(
        config: AxiosRequestConfig | undefined,
        data: object | undefined,
        queryParams = "",
    ): Promise<AxiosResponse<D>> {
        return this.request.post(queryParams, data, config);
    }
}

export default new AxiosSignUpFlow();
