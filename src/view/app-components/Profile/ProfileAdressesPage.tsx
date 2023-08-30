import React, { useEffect, useState } from "react";
import Text from "view/app-components/Text/text";
import EditButton from "view/app-components/Profile/EditButton";
import {
    getInitialProfileAdressBilling,
    getInitialProfileAdressShipping,
} from "view/app-components/Profile/profile-utils";

export interface IBillingAddress {
    // firstname: string;
    // lastname: string;
    // email: string;
    // password: string;
    // birthdayDate: string;
    billingStreet: string;
    billingCity: string;
    billingPostalCode: string;
    billingCountry: string;
    // shippingStreet: string;
    // shippingCity: string;
    // shippingPostalCode: string;
    // shippingCountry: string;
}

const getInitialBilling = (): IBillingAddress => ({
    // firstname: "",
    // lastname: "",
    // birthdayDate: `${validFormatCurrentDate}`,
    // email: "",
    // password: "",
    billingStreet: "billingStreet",
    billingCity: "billingCity",
    billingPostalCode: "billingPostalCode",
    billingCountry: "BE",
    // shippingStreet: "",
    // shippingCity: "",
    // shippingPostalCode: "",
    // shippingCountry: "BE",
});

export default function ProfileAdressesPage() {
    const [edit, setEdit] = useState<boolean>(false);
    const [defaultBillingAddress, setDefaultBillingAddress] = useState(false);
    const [defaultShippingAddress, setDefaultShippingAddress] = useState(false);
    // const inputRef = useRef<HTMLInputElement>(null);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [dataBilling, setdataBilling] = useState<IBillingAddress>(getInitialBilling());
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [dataShipping, setdataShipping] = useState();

    // useEffect(() => {
    //     inputRef.current?.focus();
    // }, [edit]);

    useEffect(() => {
        const fetchData = async () => {
            // const dataCustomer = await getCustomer();
            // console.log("log from adresses", dataCustomer.addresses);
            // console.log("Billing adress:", dataCustomer.addresses[0]);
            // console.log("Shipping adress:", dataCustomer.addresses[1]);
            const dataBill = await getInitialProfileAdressBilling();
            setdataBilling(dataBill);
            console.log("dataBilling", dataBilling);
            console.log("getInitialProfileAdressBilling", dataBill);
            const dataShipp = await getInitialProfileAdressShipping();
            console.log("getInitialProfileAdressShipping", dataShipp);
        };
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="adresses">
            <div className="billing adress">
                <div className="adress-tittle">
                    <Text classes={["inter-600-font", "font-size_m", "color_blue-dark"]}>
                        Billing address
                    </Text>
                    <EditButton
                        onClick={() => {
                            setEdit(!edit);
                        }}
                    />
                </div>
                <div className="country-billing-adress">
                    <Text classes={["inter-400-font", "font-size_m", "color_grey-dark"]}>
                        Country:
                    </Text>
                    {edit ? (
                        <input value="" />
                    ) : (
                        <Text classes={["inter-400-font", "font-size_m", "color_grey-dark"]}>
                            Select
                        </Text>
                    )}
                    <div>
                        <Text classes={["inter-400-font", "font-size_m", "color_grey-dark"]}>
                            Street:
                        </Text>
                    </div>
                    <div>
                        <Text classes={["inter-400-font", "font-size_m", "color_grey-dark"]}>
                            City:
                        </Text>
                    </div>
                    <div>
                        <Text classes={["inter-400-font", "font-size_m", "color_grey-dark"]}>
                            Postal code:
                        </Text>
                    </div>
                </div>
                <div className="registration__default-address">
                    <Text classes={["inter-400-font", "font-size_s", "color_grey-dark"]}>
                        Make as default billing address
                    </Text>
                    <input
                        name="defaultBillingAddress"
                        type="checkbox"
                        checked={defaultBillingAddress}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setDefaultBillingAddress(e.target.checked)
                        }
                    />
                </div>

                <div className="adress-tittle">
                    <Text classes={["inter-600-font", "font-size_m", "color_blue-dark"]}>
                        Shipping address
                    </Text>
                </div>
                <div className="country-billing-adress">
                    <Text classes={["inter-400-font", "font-size_m", "color_grey-dark"]}>
                        Country:
                    </Text>
                    {edit ? (
                        <input value="TEST" />
                    ) : (
                        <Text classes={["inter-400-font", "font-size_m", "color_grey-dark"]}>
                            Select
                        </Text>
                    )}
                    <div>
                        <Text classes={["inter-400-font", "font-size_m", "color_grey-dark"]}>
                            Street:
                        </Text>
                    </div>
                    <div>
                        <Text classes={["inter-400-font", "font-size_m", "color_grey-dark"]}>
                            City:
                        </Text>
                    </div>
                    <div>
                        <Text classes={["inter-400-font", "font-size_m", "color_grey-dark"]}>
                            Postal code:
                        </Text>
                    </div>
                </div>
                <div className="registration__default-address">
                    <Text classes={["inter-400-font", "font-size_s", "color_grey-dark"]}>
                        Make as default shipping address
                    </Text>
                    <input
                        name="defaultShippingAddress"
                        type="checkbox"
                        checked={defaultShippingAddress}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setDefaultShippingAddress(e.target.checked)
                        }
                    />
                </div>
            </div>

            {/* <div className="shipping adress">
            </div> */}
        </div>
    );
}
