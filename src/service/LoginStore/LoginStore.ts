export class LoginStore {
    private static instance: LoginStore;

    private isAuthState: boolean = false;

    public static getLoginStore(): LoginStore {
        if (!this.instance) {
            this.instance = new LoginStore();
        }

        return this.instance;
    }

    public isAuth(): boolean {
        return this.isAuthState;
    }

    public setAuthStatus(value: boolean) {
        this.isAuthState = value;
    }
}
