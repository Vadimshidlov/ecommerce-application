// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useCallback, useEffect, useRef } from "react";
import RegistrationPage from "view/app-components/Registration/components/RegistrationPage";
import Header from "view/app-components/Header/Header";
import { Routes, Route } from "react-router-dom";
import MainPage from "view/app-components/MainPage/mainPage";
// import Text from "view/app-components/Text/text";
import PageNotFound from "view/app-components/PageNotFound/pageNotFound";
import { AuthDataStore } from "service/AuthDataStore";
import { AuthService } from "service/AuthService";
import { useAuth } from "auth-context";

function App() {
    // const AuthDataStoreApi = AuthDataStore.getAuthDataStore();
    const { setIsAuth } = useAuth();
    const AuthServiceApi = useRef(new AuthService());
    const AuthDataStoreApi = useRef(AuthDataStore.getAuthDataStore());

    useEffect(() => {
        (async () => {
            const isAccessToken = AuthDataStoreApi.current.getAccessAuthToken();
            const isAnonToken = AuthDataStoreApi.current.getAnonymousAccessToken();

            if (!isAccessToken) {
                setIsAuth(false);

                if (!isAnonToken) {
                    await AuthServiceApi.current.createAnonymousToken();
                }
            } else {
                setIsAuth(true);
            }
        })();
    }, [setIsAuth]);

    return (
        <div>
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route
                    path="login"
                    element={
                        <>
                            <Header />
                            Login page
                        </>
                    }
                />
                <Route
                    path="registration"
                    element={
                        <>
                            <Header />
                            <RegistrationPage />
                        </>
                    }
                />
                <Route path="*" element={<PageNotFound />} />
            </Routes>
        </div>
    );
}

export default App;
