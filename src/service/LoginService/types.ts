export type CustomerType = {
    customer: {
        addresses: [];
        authenticationMode: string;
        billingAddressIds: [];
        createdAt: string;
        createdBy: {
            isPlatformClient: boolean;
            user: {
                id: string;
                typeId: string;
            };
        };
        email: string;
        firstName: string;
        id: string;
        isEmailVerified: boolean;
        lastMessageSequenceNumber: number;
        lastModifiedAt: string;
        lastModifiedBy: {
            anonymousId: string;
            clientId: string;
            isPlatformClient: boolean;
        };
        lastName: string;
        middleName: string;
        password: string;
        salutation: string;
        shippingAddressIds: [];
        stores: [];
        title: string;
        version: number;
        versionModifiedAt: string;
    };
};

export type DataResponseType = {
    access_token: string;
    expires_in: number;
    token_type: string;
    refresh_token: string;
    scope: string;
};

export type LoginType = {
    email: string;
    password: string;
};
