import React from "react";

async function sendRequest() {
    const CTP_AUTH_URL = "https://auth.europe-west1.gcp.commercetools.com";
    const CTP_PROJECT_KEY = "uwoc_ecm-app";
    // const CTP_CLIENT_SECRET = "XP_DSn4dR1OJG4P8fpr9EUp0vZcSb-Ae";
    // const CTP_CLIENT_ID = "aP0M2mJZSI39Q4kSIVvg9knk";

    // const url = `https://auth.europe-west1.gcp.commercetools.com/oauth/uwoc_ecm-app/anonymous/token?grant_type=client_credentials&scope=create_anonymous_token:uwoc_ecm-app`;
    const url = `${CTP_AUTH_URL}/oauth/${CTP_PROJECT_KEY}/anonymous/token?grant_type=client_credentials&scope=view_published_products:uwoc_ecm-app`;

    const token = await fetch(url, {
        method: "POST",
        headers: {
            Authorization: `Basic YVAwTTJtSlpTSTM5UTRrU0lWdmc5a25rOlhQX0RTbjRkUjFPSkc0UDhmcHI5RVVwMHZaY1NiLUFl`,
            // Authorization: `Basic ${CTP_CLIENT_ID}:${CTP_CLIENT_SECRET}`,
            "Content-Type": "application/x-www-form-urlencoded",
        },
    });

    console.log(await token.json());
}

export default function ButtonToken() {
    return (
        <button type="button" onClick={sendRequest}>
            Button
        </button>
    );
}
