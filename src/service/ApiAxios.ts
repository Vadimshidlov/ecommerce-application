import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

class AxiosAuthApi {
    public request: AxiosInstance;

    private readonly CTP_PROJECT_KEY = "uwoc_ecm-app";

    private readonly API_URL =
        "https://api.europe-west1.gcp.commercetools.com/uwoc_ecm-app/me/signup";

    constructor() {
        this.request = axios.create({
            baseURL: `${this.API_URL}`,
        });
    }

    public post<D>(
        // urlParams: string,
        config: AxiosRequestConfig | undefined,
        data: object | undefined,
        queryParams = "",
    ): Promise<AxiosResponse<D>> {
        return this.request.post(queryParams, data, config);
    }
}

export default new AxiosAuthApi();
