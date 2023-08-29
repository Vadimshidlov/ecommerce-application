import { AxiosResponse } from "axios";
import { ISignUpForm } from "shared/utils/getInitialFormData";
import { AuthDataStore } from "service/AuthDataStore/AuthDataStore";
import AxiosSignUpService from "service/AxiosApiService/AxiosApiService";
import { CustomerDataType } from "service/RegistrationService/types";

export class RegistrationService {
    private AxiosSignUpServiceApi = AxiosSignUpService;

    private readonly AuthDataStoreApi = AuthDataStore.getAuthDataStore();

    public async createCustomer(
        formData: ISignUpForm,
        defaultBillingAddress: boolean,
        defaultShippingAddress: boolean,
    ): Promise<void> {
        const customerData = this.getCustomerData(
            formData,
            defaultBillingAddress,
            defaultShippingAddress,
        );

        await this.AxiosSignUpServiceApi.post<AxiosResponse>({}, customerData, "customers");
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
