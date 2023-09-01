import { getCustomer } from "view/app-components/Profile/axiosProfile";

// type AdressType = {
//     street: string;
//     postal: string;
//     city: string;
//     country: string;
// };
export type BillingAdressType = {
    id: string;
    streetName: string;
    postalCode: string;
    city: string;
    country: string;
};

export async function getInitialProfileAdressBilling() {
    const data = await getCustomer();
    return data.addresses[0];
}

export async function getInitialProfileAdressShipping() {
    const data = await getCustomer();
    return data.addresses[1];
}

export async function isBillingDefault() {
    const data = await getCustomer();
    let response = false;
    for (const key in data) {
        if (key === "defaultBillingAddressId") response = true;
    }
    return response;
}
