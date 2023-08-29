export class AuthDataStore {
    private static instance: AuthDataStore;

    private readonly ANONYMOUS_ACCESS_TOKEN_KEY = "anonymousAccessToken";

    private readonly ANONYMOUS_REFRESH_TOKEN_KEY = "anonymousRefreshToken";

    private readonly AUTH_ACCESS_TOKEN_KEY = "accessAuthToken";

    private readonly AUTH_REFRESH_TOKEN_KEY = "refreshAuthToken";

    private readonly AUTH_REFRESH_TOKEN_MESSAGE = "Auth refresh token was fallen";

    private readonly ANONYMOUS_REFRESH_TOKEN_MESSAGE = "Anonymous refresh token was fallen";

    public static getAuthDataStore(): AuthDataStore {
        if (!this.instance) {
            this.instance = new AuthDataStore();
        }

        return this.instance;
    }

    public setAnonymousTokens(anonymousAccessToken: string, anonymousRefreshToken: string): void {
        localStorage.setItem(this.ANONYMOUS_ACCESS_TOKEN_KEY, anonymousAccessToken);
        localStorage.setItem(this.ANONYMOUS_REFRESH_TOKEN_KEY, anonymousRefreshToken);
    }

    public setAuthTokens(accessAuthToken: string, refreshAuthToken: string): void {
        localStorage.setItem(this.AUTH_ACCESS_TOKEN_KEY, accessAuthToken);
        localStorage.setItem(this.AUTH_REFRESH_TOKEN_KEY, refreshAuthToken);
    }

    public getAnonymousAccessToken(): string | null {
        const anonymousAccessToken = localStorage.getItem(this.ANONYMOUS_ACCESS_TOKEN_KEY);

        if (!anonymousAccessToken) {
            return null;
        }

        return anonymousAccessToken;
    }

    public getAnonymousRefreshToken(): string {
        const anonymousRefreshToken = localStorage.getItem(this.ANONYMOUS_REFRESH_TOKEN_KEY);

        if (!anonymousRefreshToken) {
            throw new Error(this.ANONYMOUS_REFRESH_TOKEN_MESSAGE);
        }

        return anonymousRefreshToken;
    }

    public getAccessAuthToken(): string | null {
        const accessAuthToken = localStorage.getItem(this.AUTH_ACCESS_TOKEN_KEY);

        if (!accessAuthToken) {
            return null;
        }

        return accessAuthToken;
    }

    public getAuthRefreshToken(): string {
        const refreshAuthToken = localStorage.getItem(this.AUTH_REFRESH_TOKEN_KEY);

        if (!refreshAuthToken) {
            throw new Error(this.AUTH_REFRESH_TOKEN_MESSAGE);
        }

        return refreshAuthToken;
    }

    public removeTokenFromStore(key: string): void {
        localStorage.removeItem(key);
    }
}
