// import { AxiosRequestConfig, AxiosResponse } from "axios";
import AxiosAnonymousService from "service/AxiosAnonymousService";
import AxiosSignUpService from "service/AxiosSignUpService";

export class RequestApiService {
    private static instance: RequestApiService;

    private readonly ANONYMOUS_ACCESS_TOKEN_KEY = "anonymousAccessToken";

    private isAuthUser: boolean = false;

    private AxiosAnonymousServiceApi = AxiosAnonymousService;

    private AxiosAuthServiceApi = AxiosSignUpService;

    public static getRequestApiService(): RequestApiService {
        if (!this.instance) {
            this.instance = new RequestApiService();
        }

        return this.instance;
    }

    // public async post<D>(
    //     url: string,
    //     config: AxiosRequestConfig | undefined,
    //     data: object | undefined = {},
    // ): Promise<AxiosResponse<D>> {
    //     if (this.isAuthUser) {
    //         const response = await this.AxiosAuthServiceApi.post<D>(url, config, data);
    //         return response;
    //     } else {
    //         const response = await this.AxiosAnonymousServiceApi.post<D>(url, config, data);
    //         return response;
    //     }
    // }

    public setAuthStatus(value: boolean): void {
        this.isAuthUser = value;
    }
}
