import React, { useEffect } from "react";
import { useAuth } from "auth-context";
import { useNavigate, Outlet, Navigate } from "react-router-dom";
import Navbar from "view/app-components/Profile/Navbar";
import Text from "shared/components/Text/text";
import "view/app-components/Profile/style.scss";
import { getCustomer } from "view/app-components/Profile/axiosProfile";
import { AuthDataStore } from "service/AuthDataStore/AuthDataStore";

export default function ProfilePage() {
    const navigate = useNavigate();
    const { isAuth } = useAuth();
    const AUTH_DATA_STORE: AuthDataStore = new AuthDataStore();

    if (!isAuth) {
        return <Navigate to="/" />;
    }

    async function getCustomerAPI() {
        const dataCustomer = await getCustomer();
        AUTH_DATA_STORE.setProfileVersion(dataCustomer.version);
        AUTH_DATA_STORE.setProfileBillingId(dataCustomer.billingAddressIds[0]);
        AUTH_DATA_STORE.setProfileShippingId(dataCustomer.shippingAddressIds[0]);
    }

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        navigate("/profile/adresses");
        getCustomerAPI();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            <Text
                classes={[
                    "profile-tittle",
                    "space-grotesk-500-font",
                    "font-size_heading-3",
                    "color_black",
                ]}
            >
                My profile
            </Text>
            {/* <button onClick={getCustomerAPI}>getCustomer</button> */}
            <div className="profile-container">
                <Navbar />
                <Outlet />
            </div>
        </div>
    );
}
