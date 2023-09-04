export type CategoryResponse = {
    id: string;
    version: number;
    versionModifiedAt: string;
    lastMessageSequenceNumber: number;
    createdAt: string;
    lastModifiedAt: string;
    lastModifiedBy: {
        isPlatformClient: true;
        user: {
            typeId: string;
            id: string;
        };
    };
    createdBy: {
        isPlatformClient: boolean;
        user: {
            typeId: string;
            id: string;
        };
    };
    key: string;
    name: {
        "en-US": string;
    };
    slug: {
        "en-US": string;
    };
    description: {
        "en-US": string;
    };
    ancestors: [];
    orderHint: string;
    externalId: string;
    assets: [];
};
