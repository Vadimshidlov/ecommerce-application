import React, { useEffect, useRef, useState } from "react";
import Text from "view/app-components/Text/text";
import EditButton from "view/app-components/Profile/EditButton";

export default function ProfileAdressesPage() {
    const [edit, setEdit] = useState<boolean>(false);
    const [defaultBillingAddress, setDefaultBillingAddress] = useState(false);
    const [defaultShippingAddress, setDefaultShippingAddress] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        inputRef.current?.focus();
    }, [edit]);

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
            </div>

            <div className="shipping adress">
                <div className="adress-tittle">
                    <Text classes={["inter-600-font", "font-size_m", "color_blue-dark"]}>
                        Shipping address
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
        </div>
    );
}
