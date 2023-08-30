import { getCustomer } from "view/app-components/Profile/axiosProfile";

// type AdressType = {
//     street: string;
//     postal: string;
//     city: string;
//     country: string;
// };

export async function getInitialProfileAdressBilling() {
    const data = await getCustomer();
    return data.addresses[0];
}

export async function getInitialProfileAdressShipping() {
    const data = await getCustomer();
    return data.addresses[1];
}
