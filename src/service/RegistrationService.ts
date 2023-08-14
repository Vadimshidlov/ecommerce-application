import { AxiosResponse } from "axios";
import AxiosAuthApi from "service/ApiAxios";
import { ISignUpForm } from "shared/utils/getInitialFormData";
import { AuthDataStore } from "service/AuthDataStore";

export type CutomerAddressType = {
    streetName: string;
    postalCode: string;
    city: string;
    country: string;
};

export type CustomerDataType = {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    addresses: CutomerAddressType[];
    shippingAddresses: number[];
    billingAddresses: number[];
};

export class RegistrationService {
    private readonly CTP_AUTH_URL = "https://auth.europe-west1.gcp.commercetools.com";

    private readonly CTP_API_URL = "https://api.europe-west1.gcp.commercetools.com";

    private readonly CTP_PROJECT_KEY = "uwoc_ecm-app";

    private readonly CTP_CLIENT_SECRET = "mwT7A3NCbwvYU1uhhT-eBUGQjtxLtJNW";

    private readonly CTP_CLIENT_ID = "XF0rGB0-e3-TD42FR9KX9DJq";

    private readonly requestApi = AxiosAuthApi;

    private readonly AuthDataStoreApi = AuthDataStore.getAuthDataStore();

    public async createCustomer(formData: ISignUpForm): Promise<void> {
        console.log(formData, `from createCustomer`);

        // const urlParams = `${this.CTP_PROJECT_KEY}/customers`;

        const token = this.AuthDataStoreApi.getAnonymousToken();

        console.log(token, `TOKEN FROM REGISTRATION`);

        const customerData: CustomerDataType = {
            email: formData.email,
            firstName: formData.firstname,
            lastName: formData.lastname,
            password: formData.password,
            addresses: [
                {
                    streetName: formData.billingStreet,
                    postalCode: formData.billingPostalCode,
                    city: formData.billingCity,
                    country: formData.billingCountry,
                },
                {
                    streetName: formData.shippingStreet,
                    postalCode: formData.shippingPostalCode,
                    city: formData.shippingCity,
                    country: formData.shippingCountry,
                },
            ],
            shippingAddresses: [1],
            billingAddresses: [0],
        };

        try {
            const response = await this.requestApi.post<AxiosResponse>(
                // urlParams,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
                customerData,
            );

            // const fetchResponse = await fetch(
            //     "https://api.europe-west1.gcp.commercetools.com/uwoc_ecm-app/customers",
            //     {
            //         method: "POST",
            //         headers: {
            //             Authorization: `Bearer ${token}`,
            //             "Content-Type": "application/json",
            //         },
            //         body: JSON.stringify(customerData),
            //     },
            // );

            // console.log(fetchResponse, `RESPONSE From FETCH`);

            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }
}
