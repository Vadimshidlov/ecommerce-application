/* eslint-disable no-useless-catch */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import axios, { AxiosError, AxiosResponse } from "axios";
import { ISignUpForm } from "shared/utils/getInitialFormData";
import { AuthDataStore } from "service/AuthDataStore";
import AxiosSignUpAuth from "service/AxiosSignUpAuth";
import LoginService from "service/LoginService";

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
    defaultBillingAddress?: number;
    defaultShippingAddress?: number;
};

export type AuthCustomerDataType = {
    email: string;
    password: string;
};

export class RegistrationService {
    private readonly CTP_AUTH_URL = "https://auth.europe-west1.gcp.commercetools.com";

    private readonly CTP_API_URL = "https://api.europe-west1.gcp.commercetools.com";

    private readonly CTP_PROJECT_KEY = "uwoc_ecm-app";

    private readonly CTP_CLIENT_SECRET = "mwT7A3NCbwvYU1uhhT-eBUGQjtxLtJNW";

    private readonly CTP_CLIENT_ID = "XF0rGB0-e3-TD42FR9KX9DJq";

    private readonly requestApi = AxiosSignUpAuth;

    private readonly loginServiceApi = new LoginService();

    private readonly AuthDataStoreApi = AuthDataStore.getAuthDataStore();

    public async createCustomer(
        formData: ISignUpForm,
        defaultBillingAddress: boolean,
        defaultShippingAddress: boolean,
    ): Promise<void> {
        console.log(formData, `from createCustomer`);

        // const urlParams = `${this.CTP_PROJECT_KEY}/customers`;

        const token = this.AuthDataStoreApi.getAnonymousAccessToken();

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
                    country: formData.billingCountry.toUpperCase(),
                },
                {
                    streetName: formData.shippingStreet,
                    postalCode: formData.shippingPostalCode,
                    city: formData.shippingCity,
                    country: formData.shippingCountry.toUpperCase(),
                },
            ],
            shippingAddresses: [1],
            billingAddresses: [0],
            // defaultBillingAddress: defaultBillingAddress ? [0] : [],
            // defaultShippingAddress: defaultShippingAddress ? [1] : [],
        };

        if (defaultBillingAddress && defaultShippingAddress) {
            customerData.defaultBillingAddress = 0;
            customerData.defaultShippingAddress = 1;
        } else if (defaultBillingAddress) {
            customerData.defaultBillingAddress = 0;
        } else if (defaultShippingAddress) {
            customerData.defaultShippingAddress = 1;
        }

        // try {
        const response = await this.requestApi.post<AxiosResponse>(
            // urlParams,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
            customerData,
        );

        console.log(response, `response from Service`);
        // } catch (error) {
        // throw error;

        // if (axios.isAxiosError(error)) {
        /* if (error instanceof AxiosError) {
                console.log(error.response?.data.message, `error`);
            } else if (error instanceof Error) {
                console.log(error.message);
            } */

        // if (response.status !== 200) {
        //     console.log(response, "response");
        //     throw Error("Error from customer registration service");
        // }
        // }
    }
}
