import axios from "axios";
import { AuthDataStore } from "service/AuthDataStore/AuthDataStore";
import {
    BillingAdressType,
    ChangePasswordType,
    DetailsType,
} from "view/app-components/Profile/profile-utils";

const AUTH_DATA_STORE: AuthDataStore = new AuthDataStore();
const PROJECT_KEY = process.env.REACT_APP_CTP_PROJECT_KEY ?? "";
const urlAPI = `https://api.europe-west1.gcp.commercetools.com/${PROJECT_KEY}/me`;

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

    const data = {
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
    };

    const response = await axios.post(urlAPI, data, {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    });

    AUTH_DATA_STORE.setProfileVersion(response.data.version);

    if (response.status !== 200) {
        throw Error("User with such credentials was not found");
    }
}

export async function changePasswordProfile(dataPasswords: ChangePasswordType) {
    const version = +AUTH_DATA_STORE.getProfileVersion();
    const token = AUTH_DATA_STORE.getAccessAuthToken();
    const url = `${urlAPI}/password`;

    const data = {
        version,
        currentPassword: dataPasswords.currentPassword,
        newPassword: dataPasswords.newPassword,
    };

    const response = await axios.post(url, data, {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    });

    AUTH_DATA_STORE.setProfileVersion(response.data.version);

    if (response.status !== 200) {
        throw Error("User with such credentials was not found");
    }
}
