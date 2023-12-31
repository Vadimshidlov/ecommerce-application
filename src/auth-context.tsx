import React, { useEffect, useMemo, useRef, useState } from "react";
import { AuthService } from "service/AuthService/AuthService";
import { AuthDataStore } from "service/AuthDataStore/AuthDataStore";

import { LoginStore } from "service/LoginStore/LoginStore";
import BasketService from "service/BasketService/BasketService";
import BasketStore from "store/basket-store";

export type IsAuthType = boolean;
export type AuthContextType = {
    isAuth: IsAuthType;
    setIsAuth: React.Dispatch<React.SetStateAction<boolean>>;
};
export type AuthProviderProps = { children: React.ReactNode };

const AuthStateContext = React.createContext<AuthContextType | null>(null);

function AuthStateProvider({ children }: AuthProviderProps) {
    const [isAuth, setIsAuth] = useState<boolean>(false);

    const AuthServiceApi = useRef(new AuthService());
    const AuthDataStoreApi = useRef(AuthDataStore.getAuthDataStore());
    const basketService = useRef(new BasketService());
    const { updateBasketStore } = BasketStore;

    useEffect(() => {
        (async () => {
            const isAccessToken = AuthDataStoreApi.current.getAccessAuthToken();
            const isAnonToken = AuthDataStoreApi.current.getAnonymousAccessToken();
            const loginStore = LoginStore.getLoginStore();

            if (!isAccessToken) {
                setIsAuth(false);
                loginStore.setAuthStatus(false);

                if (!isAnonToken) {
                    await AuthServiceApi.current.createAnonymousToken();

                    if (!localStorage.getItem("cartId")) {
                        const basketResponse = await basketService.current.createBasket();
                        updateBasketStore(basketResponse);
                    }
                }
            } else {
                setIsAuth(true);
                loginStore.setAuthStatus(true);
            }
        })();
    }, [setIsAuth, updateBasketStore]);

    const value = useMemo(() => ({ isAuth, setIsAuth }), [isAuth]);

    return <AuthStateContext.Provider value={value}>{children}</AuthStateContext.Provider>;
}

function useAuth() {
    const context = React.useContext(AuthStateContext);

    if (!context) {
        throw new Error("useAuth must be used within a CountProvider");
    }

    return context;
}

export { AuthStateProvider, useAuth };
