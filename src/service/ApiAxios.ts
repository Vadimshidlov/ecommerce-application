import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

class AxiosAuthApi {
    public request: AxiosInstance;

    private readonly CTP_PROJECT_KEY = "uwoc_ecm-app";

    private readonly API_URL = "https://api.europe-west1.gcp.commercetools.com/";

    constructor() {
        this.request = axios.create({
            url: `${this.API_URL}`,
        });
    }

    public post<D>(
        urlParams: string,
        config: AxiosRequestConfig | undefined,
        data: object | undefined = {},
    ): Promise<AxiosResponse<D>> {
        const url = this.API_URL + urlParams;

        return this.request.post(url, data, config);
    }
}

export default new AxiosAuthApi();
