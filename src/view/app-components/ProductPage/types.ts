export type ProductResponseType = {
    id: string;
    version: number;
    productType: {
        typeId: string;
        id: string;
    };
    name: {
        "en-US": string;
    };
    description: {
        "en-US": string;
    };
    categories: [
        {
            typeId: string;
            id: string;
        },
        {
            typeId: string;
            id: string;
        },
    ];
    categoryOrderHints: object;
    slug: {
        "en-US": string;
    };
    metaTitle: {
        "en-US": string;
        ru: string;
    };
    metaDescription: {
        "en-US": string;
        ru: string;
    };
    masterVariant: {
        id: number;
        sku: string;
        key: string;
        prices: [
            {
                id: string;
                discounted: {
                    discount: {
                        id: string;
                        typeId: string;
                    };
                    value: {
                        centAmount: number;
                        currencyCode: string;
                        fractionDigits: number;
                        type: string;
                    };
                };

                value: {
                    type: string;
                    currencyCode: string;
                    centAmount: number;
                    fractionDigits: number;
                };
            },
        ];
        images: [
            {
                url: string;
                dimensions: {
                    w: number;
                    h: number;
                };
            },
            {
                url: string;
                dimensions: {
                    w: number;
                    h: number;
                };
            },
            {
                url: string;
                dimensions: {
                    w: number;
                    h: number;
                };
            },
        ];
        attributes: [
            {
                name: string;
                value: {
                    key: string;
                    label: string;
                };
            },
            {
                name: string;
                value: {
                    key: string;
                    label: string;
                };
            },
            {
                name: string;
                value: {
                    key: string;
                    label: string;
                };
            },
        ];
        assets: [];
    };
    variants: [
        {
            id: number;
            sku: string;
            key: string;
            prices: [
                {
                    id: string;
                    value: {
                        type: string;
                        currencyCode: string;
                        centAmount: number;
                        fractionDigits: number;
                    };
                },
            ];
            images: [
                {
                    url: string;
                    dimensions: {
                        w: number;
                        h: number;
                    };
                },
                {
                    url: string;
                    dimensions: {
                        w: number;
                        h: number;
                    };
                },
                {
                    url: string;
                    dimensions: {
                        w: number;
                        h: number;
                    };
                },
            ];
            attributes: [
                {
                    name: string;
                    value: {
                        key: string;
                        label: string;
                    };
                },
                {
                    name: string;
                    value: {
                        key: string;
                        label: string;
                    };
                },
                {
                    name: string;
                    value: {
                        key: string;
                        label: string;
                    };
                },
            ];
            assets: [];
        },
        {
            id: number;
            sku: string;
            key: string;
            prices: [
                {
                    id: string;
                    value: {
                        type: string;
                        currencyCode: string;
                        centAmount: number;
                        fractionDigits: number;
                    };
                },
            ];
            images: [
                {
                    url: string;
                    dimensions: {
                        w: number;
                        h: number;
                    };
                },
                {
                    url: string;
                    dimensions: {
                        w: number;
                        h: number;
                    };
                },
                {
                    url: "https://732e3161f1ddcb7781ab-981b4e41d71522290b27c5040898a634.ssl.cf3.rackcdn.com/2_3-vEid5ndW.png";
                    dimensions: {
                        w: number;
                        h: number;
                    };
                },
            ];
            attributes: [
                {
                    name: string;
                    value: {
                        key: string;
                        label: string;
                    };
                },
                {
                    name: string;
                    value: {
                        key: string;
                        label: string;
                    };
                },
                {
                    name: string;
                    value: {
                        key: string;
                        label: string;
                    };
                },
            ];
            assets: [];
        },
        {
            id: number;
            sku: string;
            key: string;
            prices: [
                {
                    id: string;
                    value: {
                        type: string;
                        currencyCode: string;
                        centAmount: number;
                        fractionDigits: number;
                    };
                },
            ];
            images: [
                {
                    url: string;
                    dimensions: {
                        w: number;
                        h: number;
                    };
                },
                {
                    url: string;
                    dimensions: {
                        w: number;
                        h: number;
                    };
                },
                {
                    url: string;
                    dimensions: {
                        w: number;
                        h: number;
                    };
                },
            ];
            attributes: [
                {
                    name: string;
                    value: {
                        key: string;
                        label: string;
                    };
                },
                {
                    name: string;
                    value: {
                        key: string;
                        label: string;
                    };
                },
                {
                    name: string;
                    value: {
                        key: string;
                        label: string;
                    };
                },
            ];
            assets: [];
        },
    ];
    searchKeywords: object;
    hasStagedChanges: boolean;
    published: boolean;
    key: string;
    priceMode: string;
    createdAt: string;
    lastModifiedAt: string;
};
