import React, { useEffect, useMemo, useRef, useState } from "react";
import { AuthService } from "service/AuthService/AuthService";
import { AuthDataStore } from "service/AuthDataStore/AuthDataStore";

import { LoginStore } from "service/LoginStore/LoginStore";

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
                }
            } else {
                setIsAuth(true);
                loginStore.setAuthStatus(true);
            }
        })();
    }, [setIsAuth]);

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
