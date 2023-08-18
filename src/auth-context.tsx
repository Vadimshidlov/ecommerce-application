import React, { useState } from "react";

export type IsAuthType = boolean;
export type AuthContextType = {
    isAuth: IsAuthType;
    setIsAuth: (value: IsAuthType) => void;
};

export type State = { isAuth: boolean };
export type Action = { type: "login" } | { type: "logout" };
export type Dispatch = (action: Action) => void;
export type AuthProviderProps = { children: React.ReactNode };

const AuthStateContext = React.createContext<AuthContextType | null>(null);
// const AuthStateContext = React.createContext<AuthContextType | null>(null);
function AuthStateProvider({ children }: AuthProviderProps) {
    const [isAuth, setIsAuth] = useState<boolean>(false);

    return (
        // eslint-disable-next-line react/jsx-no-constructed-context-values
        <AuthStateContext.Provider value={{ isAuth, setIsAuth }}>
            {children}
        </AuthStateContext.Provider>
    );
}

function useAuth() {
    const context = React.useContext(AuthStateContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within a CountProvider");
    }
    return context;
}

export { AuthStateProvider, useAuth };
