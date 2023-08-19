export class AuthDataStore {
    private static instance: AuthDataStore;

    public static getAuthDataStore(): AuthDataStore {
        if (!this.instance) {
            this.instance = new AuthDataStore();
        }

        return this.instance;
    }

    public setAnonymousTokens(anonymousAccessToken: string, anonymousRefreshToken: string): void {
        localStorage.setItem("anonymousAccessToken", anonymousAccessToken);
        localStorage.setItem("anonymousRefreshToken", anonymousRefreshToken);
    }

    public setAuthTokens(accessAuthToken: string, refreshAuthToken: string): void {
        localStorage.setItem("accessAuthToken", accessAuthToken);
        localStorage.setItem("refreshAuthToken", refreshAuthToken);
    }

    public getAnonymousAccessToken(): string {
        const anonymousAccessToken = localStorage.getItem("anonymousAccessToken");

        if (!anonymousAccessToken) {
            // throw new Error("Anonymous access token was fallen");
            return "";
        }

        return anonymousAccessToken;
    }

    public getAnonymousRefreshToken(): string {
        const anonymousRefreshToken = localStorage.getItem("anonymousRefreshToken");

        if (!anonymousRefreshToken) {
            throw new Error("Anonymous refresh token was fallen");
        }

        return anonymousRefreshToken;
    }

    public getAccessAuthToken(): string {
        const accessAuthToken = localStorage.getItem("accessAuthToken");

        if (!accessAuthToken) {
            return "";
        }

        return accessAuthToken;
    }

    public getAuthRefreshToken(): string {
        const refreshAuthToken = localStorage.getItem("refreshAuthToken");

        if (!refreshAuthToken) {
            throw new Error("Auth refresh token was fallen");
        }

        return refreshAuthToken;
    }

    public removeTokenFromStore(key: string): void {
        const token = localStorage.getItem(key);

        if (token) {
            localStorage.removeItem(key);
        }
    }
}
