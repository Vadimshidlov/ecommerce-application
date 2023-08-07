type TokenResponseType = {
    access_token: string;
    expires_in: number;
    token_type: string;
    scope: string;
    refresh_token: string;
};

type GetAnonTokenType =
    `anonymous/token?grant_type=client_credentials&scope=view_published_products`;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export class AuthService {
    private readonly CTP_AUTH_URL = "https://auth.europe-west1.gcp.commercetools.com";

    private readonly CTP_API_URL = "https://api.europe-west1.gcp.commercetools.com";

    private readonly CTP_PROJECT_KEY = "uwoc_ecm-app";

    private readonly CTP_CLIENT_SECRET = "XP_DSn4dR1OJG4P8fpr9EUp0vZcSb-Ae";

    private readonly CTP_CLIENT_ID = "aP0M2mJZSI39Q4kSIVvg9knk";

    private readonly ANON_TOKEN_CONTENT_TYPE = "application/x-www-form-urlencoded";

    private readonly ANON_PRODUCTS_CONTENT_TYPE = "application/json";

    private ANON_TOKEN: string = "";

    public async getAnonToken(): Promise<string> {
        const URL_PARAMS: GetAnonTokenType = `anonymous/token?grant_type=client_credentials&scope=view_published_products`;
        const url = `${this.CTP_AUTH_URL}/oauth/${this.CTP_PROJECT_KEY}/${URL_PARAMS}:${this.CTP_PROJECT_KEY}`;

        const tokenRequest = await fetch(url, {
            method: "POST",
            headers: {
                Authorization: `Basic ${btoa(`${this.CTP_CLIENT_ID}:${this.CTP_CLIENT_SECRET}`)}`,
                "Content-Type": this.ANON_TOKEN_CONTENT_TYPE,
            },
        });

        const tokenResponse: TokenResponseType = await tokenRequest.json();
        const token = tokenResponse.access_token;
        this.ANON_TOKEN = token;

        return token;
    }

    public async getAnonProducts(): Promise<object> {
        if (this.ANON_TOKEN === "") {
            throw new Error("Can not find anon token");
        }

        const urlParams = `product-projections`;
        const urlProducts = `${this.CTP_API_URL}/${this.CTP_PROJECT_KEY}/${urlParams}`;
        // const urlProductsPublished = `${CTP_API_URL}/${CTP_PROJECT_KEY}/product-projections&scope=view_published_products:${CTP_PROJECT_KEY}`;
        // const urlProducts = `${CTP_API_URL}/${CTP_PROJECT_KEY}/products`;

        const products = await fetch(urlProducts, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${this.ANON_TOKEN}`,
                "Content-Type": this.ANON_PRODUCTS_CONTENT_TYPE,
            },
        });

        return products.json();
    }
}
