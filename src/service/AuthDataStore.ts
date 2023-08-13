export class AuthDataStore {
    private static instance: AuthDataStore;

    public static getAuthDataStore(): AuthDataStore {
        if (!this.instance) {
            this.instance = new AuthDataStore();
        }

        return this.instance;
    }

    public setAnonymousToken(value: string): void {
        localStorage.setItem("anonymousToken", value);
    }

    public getAnonymousToken(): string | null {
        return localStorage.getItem("anonymousToken");
    }
}
