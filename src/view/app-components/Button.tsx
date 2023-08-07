/* eslint-disable no-console */
// noinspection JSUnusedLocalSymbols

import React from "react";
import { AuthService } from "service/AuthService";

type TokenResponseType = {
    access_token: string;
    expires_in: number;
    token_type: string;
    scope: string;
    refresh_token: string;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function sendRequest() {
    const CTP_AUTH_URL = "https://auth.europe-west1.gcp.commercetools.com";
    const CTP_API_URL = "https://api.europe-west1.gcp.commercetools.com";
    const CTP_PROJECT_KEY = "uwoc_ecm-app";
    const CTP_CLIENT_SECRET = "XP_DSn4dR1OJG4P8fpr9EUp0vZcSb-Ae";
    const CTP_CLIENT_ID = "aP0M2mJZSI39Q4kSIVvg9knk";

    // const url = `https://auth.europe-west1.gcp.commercetools.com/oauth/uwoc_ecm-app/anonymous/token?grant_type=client_credentials&scope=create_anonymous_token:uwoc_ecm-app`;
    const url = `${CTP_AUTH_URL}/oauth/${CTP_PROJECT_KEY}/anonymous/token?grant_type=client_credentials&scope=view_published_products:uwoc_ecm-app`;

    const tokenRequest = await fetch(url, {
        method: "POST",
        headers: {
            // Authorization: `Basic YVAwTTJtSlpTSTM5UTRrU0lWdmc5a25rOlhQX0RTbjRkUjFPSkc0UDhmcHI5RVVwMHZaY1NiLUFl`,
            Authorization: `Basic ${btoa(`${CTP_CLIENT_ID}:${CTP_CLIENT_SECRET}`)}`,
            // Authorization: `Basic ${CTP_CLIENT_ID}:${CTP_CLIENT_SECRET}`,
            "Content-Type": "application/x-www-form-urlencoded",
        },
    });

    const tokenResponse: TokenResponseType = await tokenRequest.json();
    const token = tokenResponse.access_token;
    console.log(tokenResponse);
    console.log(token);

    const urlProducts = `${CTP_API_URL}/${CTP_PROJECT_KEY}/product-projections`;
    // const urlProductsPublished = `${CTP_API_URL}/${CTP_PROJECT_KEY}/product-projections&scope=view_published_products:${CTP_PROJECT_KEY}`;
    // const urlProducts = `${CTP_API_URL}/${CTP_PROJECT_KEY}/products`;

    const products = await fetch(urlProducts, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    });

    console.log(await products.json());
}

const AUTH_SERVICE_API = new AuthService();

const requestClick = async () => {
    const tokenFromService = await AUTH_SERVICE_API.getAnonToken();
    console.log(tokenFromService, `tokenFromService`);

    const productsFromAnon = await AUTH_SERVICE_API.getAnonProducts();
    console.log(productsFromAnon, `productsFromAnon`);
};

export default function ButtonToken() {
    return (
        // <button type="button" onClick={sendRequest}>
        <button type="button" onClick={requestClick}>
            Button
        </button>
    );
}
