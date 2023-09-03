import { getCustomer } from "view/app-components/Profile/axiosProfile";

export type DetailsType = {
    firstName: string;
    lastName: string;
    email: string;
    birthdayDate: string;
};

export type BillingAdressType = {
    id: string;
    streetName: string;
    postalCode: string;
    city: string;
    country: string;
};

export type ChangePasswordType = {
    currentPassword: string;
    newPassword: string;
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

export async function isShippingDefault() {
    const data = await getCustomer();
    let response = false;
    for (const key in data) {
        if (key === "defaultShippingAddressId") response = true;
    }
    return response;
}

export async function getProfileDetails() {
    const data = await getCustomer();
    return {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        birthdayDate: data.dateOfBirth,
    };
}

export async function getEmail() {
    const data = await getCustomer();
    return data.email;
}
