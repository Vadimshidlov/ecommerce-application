import axios from "axios";
import { AuthDataStore } from "service/AuthDataStore";
import { BillingAdressType } from "view/app-components/Profile/profile-utils";

// const CTP_AUTH_URL = "https://auth.europe-west1.gcp.commercetools.com";

// const CTP_API_URL = "https://api.europe-west1.gcp.commercetools.com";

// const CTP_PROJECT_KEY = "uwoc_ecm-app";

// const CTP_CLIENT_SECRET = "XP_DSn4dR1OJG4P8fpr9EUp0vZcSb-Ae";

// const CTP_CLIENT_ID = "aP0M2mJZSI39Q4kSIVvg9knk";

// const ANON_TOKEN_CONTENT_TYPE = "application/x-www-form-urlencoded";

// const ANON_PRODUCTS_CONTENT_TYPE = "application/json";

const AUTH_DATA_STORE: AuthDataStore = new AuthDataStore();
const urlAPI = "https://api.europe-west1.gcp.commercetools.com/uwoc_ecm-app/me";

export async function getCustomer() {
    // console.log(token);
    const token = AUTH_DATA_STORE.getAccessAuthToken();
    const responce = await axios.get(urlAPI, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    // console.log(responce.data);
    // console.log("version", responce.data.version);
    // console.log("shippingAddressIds", responce.data.shippingAddressIds[0]);
    // console.log("billingAddressIds", responce.data.billingAddressIds[0]);
    return responce.data;
}

export async function changeBillingAdress(data: BillingAdressType) {
    const version = AUTH_DATA_STORE.getProfileVersion();
    const billingId = AUTH_DATA_STORE.getProfileBillingId();
    const token = AUTH_DATA_STORE.getAccessAuthToken();
    console.log(data);
    console.log(version);
    console.log(billingId);
    console.log(token);
    const responce = await axios.post(urlAPI, {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        data: {
            version: `${version}`,
            actions: [
                {
                    action: "changeAddress",
                    addressId: `${billingId}`,
                    // address: {
                    //     streetName: data.streetName,
                    //     postalCode: data.postalCode,
                    //     city: data.city,
                    //     country: data.country,
                    // },
                    address: data,
                },
            ],
        },
    });
    return responce.data;
}
