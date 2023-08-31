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
    dateOfBirth: string;
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
