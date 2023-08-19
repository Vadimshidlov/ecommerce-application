import React, { useMemo, useState } from "react";

export type IsAuthType = boolean;
export type AuthContextType = {
    isAuth: IsAuthType;
    setIsAuth: React.Dispatch<React.SetStateAction<boolean>>;
};
export type AuthDipatchContextType = React.Dispatch<React.SetStateAction<boolean>>;
export type State = { isAuth: boolean };
export type Action = { type: "login" } | { type: "logout" };
export type Dispatch = (action: Action) => void;
export type AuthProviderProps = { children: React.ReactNode };

const AuthStateContext = React.createContext<AuthContextType | null>(null);

function AuthStateProvider({ children }: AuthProviderProps) {
    const [isAuth, setIsAuth] = useState<boolean>(false);

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
