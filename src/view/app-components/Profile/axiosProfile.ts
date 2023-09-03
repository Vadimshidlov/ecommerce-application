import axios from "axios";
import { AuthDataStore } from "service/AuthDataStore/AuthDataStore";
import {
    BillingAdressType,
    ChangePasswordType,
    DetailsType,
} from "view/app-components/Profile/profile-utils";

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
    const token = AUTH_DATA_STORE.getAccessAuthToken();
    const responce = await axios.get(urlAPI, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return responce.data;
}

export async function changeBillingAdress(data: BillingAdressType) {
    const version = +AUTH_DATA_STORE.getProfileVersion();
    const billingId = AUTH_DATA_STORE.getProfileBillingId();
    const token = AUTH_DATA_STORE.getAccessAuthToken();

    const dataNew = JSON.stringify({
        version,
        actions: [
            {
                action: "changeAddress",
                addressId: `${billingId}`,
                address: {
                    streetName: data.streetName,
                    postalCode: data.postalCode,
                    city: data.city,
                    country: data.country,
                },
            },
        ],
    });
    const config = {
        method: "post",
        maxBodyLength: Infinity,
        url: urlAPI,
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        data: dataNew,
    };
    axios.request(config).then((response) => {
        AUTH_DATA_STORE.setProfileVersion(JSON.stringify(response.data.version));
    });
}

export async function changeShippingAdress(data: BillingAdressType) {
    const version = +AUTH_DATA_STORE.getProfileVersion();
    const billingId = AUTH_DATA_STORE.getProfileShippingId();
    const token = AUTH_DATA_STORE.getAccessAuthToken();

    const dataNew = JSON.stringify({
        version,
        actions: [
            {
                action: "changeAddress",
                addressId: `${billingId}`,
                address: {
                    streetName: data.streetName,
                    postalCode: data.postalCode,
                    city: data.city,
                    country: data.country,
                },
            },
        ],
    });
    const config = {
        method: "post",
        maxBodyLength: Infinity,
        url: urlAPI,
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        data: dataNew,
    };
    axios.request(config).then((response) => {
        AUTH_DATA_STORE.setProfileVersion(JSON.stringify(response.data.version));
    });
}

export async function setDefaultBillingAddressAPI() {
    const version = +AUTH_DATA_STORE.getProfileVersion();
    const billingId = AUTH_DATA_STORE.getProfileBillingId();
    const token = AUTH_DATA_STORE.getAccessAuthToken();

    const data = JSON.stringify({
        version,
        actions: [
            {
                action: "setDefaultBillingAddress",
                addressId: billingId,
            },
        ],
    });
    const config = {
        method: "post",
        maxBodyLength: Infinity,
        url: urlAPI,
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        data,
    };
    axios.request(config).then((response) => {
        AUTH_DATA_STORE.setProfileVersion(JSON.stringify(response.data.version));
    });
}

export async function setDefaultShippingAddressAPI() {
    const version = +AUTH_DATA_STORE.getProfileVersion();
    const shippingId = AUTH_DATA_STORE.getProfileShippingId();
    const token = AUTH_DATA_STORE.getAccessAuthToken();

    const data = JSON.stringify({
        version,
        actions: [
            {
                action: "setDefaultShippingAddress",
                addressId: shippingId,
            },
        ],
    });
    const config = {
        method: "post",
        maxBodyLength: Infinity,
        url: urlAPI,
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        data,
    };
    axios.request(config).then((response) => {
        AUTH_DATA_STORE.setProfileVersion(JSON.stringify(response.data.version));
    });
}

export async function removeDefaultBillingAddressAPI() {
    const version = +AUTH_DATA_STORE.getProfileVersion();
    const token = AUTH_DATA_STORE.getAccessAuthToken();

    const data = JSON.stringify({
        version,
        actions: [
            {
                action: "setDefaultBillingAddress",
            },
        ],
    });
    const config = {
        method: "post",
        maxBodyLength: Infinity,
        url: urlAPI,
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        data,
    };
    axios.request(config).then((response) => {
        AUTH_DATA_STORE.setProfileVersion(JSON.stringify(response.data.version));
    });
}

export async function removeDefaultShippingAddressAPI() {
    const version = +AUTH_DATA_STORE.getProfileVersion();
    const token = AUTH_DATA_STORE.getAccessAuthToken();

    const data = JSON.stringify({
        version,
        actions: [
            {
                action: "setDefaultShippingAddress",
            },
        ],
    });
    const config = {
        method: "post",
        maxBodyLength: Infinity,
        url: urlAPI,
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        data,
    };
    axios.request(config).then((response) => {
        AUTH_DATA_STORE.setProfileVersion(JSON.stringify(response.data.version));
    });
}

export async function changeDetailsProfile(details: DetailsType) {
    const version = +AUTH_DATA_STORE.getProfileVersion();
    const token = AUTH_DATA_STORE.getAccessAuthToken();

    const data = JSON.stringify({
        version,
        actions: [
            {
                action: "setFirstName",
                firstName: details.firstName,
            },
            {
                action: "setLastName",
                lastName: details.lastName,
            },
            {
                action: "changeEmail",
                email: details.email,
            },
            {
                action: "setDateOfBirth",
                dateOfBirth: details.birthdayDate,
            },
        ],
    });

    const config = {
        method: "post",
        maxBodyLength: Infinity,
        url: urlAPI,
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        data,
    };

    axios
        .request(config)
        .then((response) => {
            if (response.status !== 200) {
                throw Error("User with such credentials was not found");
            }
            AUTH_DATA_STORE.setProfileVersion(JSON.stringify(response.data.version));
        })
        .catch((e) => {
            throw e;
        });
}

export async function changePasswordProfile(dataPasswords: ChangePasswordType) {
    const version = +AUTH_DATA_STORE.getProfileVersion();
    const token = AUTH_DATA_STORE.getAccessAuthToken();
    const url = `${urlAPI}/password`;

    // const data = JSON.stringify({
    //     version,
    //     currentPassword: dataPasswords.currentPassword,
    //     newPassword: dataPasswords.newPassword,
    // });
    //
    const data = {
        version,
        currentPassword: dataPasswords.currentPassword,
        newPassword: dataPasswords.newPassword,
    };

    // const config = {
    //     method: "post",
    //     maxBodyLength: Infinity,
    //     url,
    //     headers: {
    //         Authorization: `Bearer ${token}`,
    //         "Content-Type": "application/json",
    //     },
    //     data,
    // };

    const response = await axios.post<ChangePasswordType>(url, data, {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    });

    if (response.status !== 200) {
        throw Error("User with such credentials was not found");
    }

    // axios
    //     .request(config)
    //     .then((response) => {
    //         AUTH_DATA_STORE.setProfileVersion(JSON.stringify(response.data.version));
    //     })
    //     .catch((error) => {
    //         console.log(error, `123,error`);
    //         throw new Error("123");
    //         // if (axios.isAxiosError(error)) {
    //         //     throw error;
    //         // }
    //     });
}
