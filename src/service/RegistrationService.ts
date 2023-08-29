import { AxiosResponse } from "axios";
import { ISignUpForm } from "shared/utils/getInitialFormData";
import { AuthDataStore } from "service/AuthDataStore";
import AxiosSignUpAuth from "service/AxiosSignUpService";

export type CustomerAddressType = {
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
    addresses: CustomerAddressType[];
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
    private readonly requestApi = AxiosSignUpAuth;

    private readonly AuthDataStoreApi = AuthDataStore.getAuthDataStore();

    public async createCustomer(
        formData: ISignUpForm,
        defaultBillingAddress: boolean,
        defaultShippingAddress: boolean,
    ): Promise<void> {
        const token = this.AuthDataStoreApi.getAnonymousAccessToken();

        const customerData = this.getCustomerData(
            formData,
            defaultBillingAddress,
            defaultShippingAddress,
        );

        // const customerData: CustomerDataType = {
        //     email: formData.email,
        //     firstName: formData.firstname,
        //     lastName: formData.lastname,
        //     password: formData.password,
        //     addresses: [
        //         {
        //             streetName: formData.billingStreet,
        //             postalCode: formData.billingPostalCode,
        //             city: formData.billingCity,
        //             country: formData.billingCountry.toUpperCase(),
        //         },
        //         {
        //             streetName: formData.shippingStreet,
        //             postalCode: formData.shippingPostalCode,
        //             city: formData.shippingCity,
        //             country: formData.shippingCountry.toUpperCase(),
        //         },
        //     ],
        //     shippingAddresses: [1],
        //     billingAddresses: [0],
        // };

        // if (defaultBillingAddress && defaultShippingAddress) {
        //     customerData.defaultBillingAddress = 0;
        //     customerData.defaultShippingAddress = 1;
        // } else if (defaultBillingAddress) {
        //     customerData.defaultBillingAddress = 0;
        // } else if (defaultShippingAddress) {
        //     customerData.defaultShippingAddress = 1;
        // }

        await this.requestApi.post<AxiosResponse>(
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
            customerData,
            "customers",
        );
    }

    private getCustomerData(
        formData: ISignUpForm,
        defaultBillingAddress: boolean,
        defaultShippingAddress: boolean,
    ): CustomerDataType {
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
        };

        if (defaultBillingAddress && defaultShippingAddress) {
            customerData.defaultBillingAddress = 0;
            customerData.defaultShippingAddress = 1;
        } else if (defaultBillingAddress) {
            customerData.defaultBillingAddress = 0;
        } else if (defaultShippingAddress) {
            customerData.defaultShippingAddress = 1;
        }

        return customerData;
    }
}
