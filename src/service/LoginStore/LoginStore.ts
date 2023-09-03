export class LoginStore {
    private static instance: LoginStore;

    private isAuth: boolean = false;

    public static getLoginStore(): LoginStore {
        if (!this.instance) {
            this.instance = new LoginStore();
        }

        return this.instance;
    }

    public getAuthStatus(): boolean {
        return this.isAuth;
    }

    public setAuthStatus(value: boolean) {
        this.isAuth = value;
    }
}
