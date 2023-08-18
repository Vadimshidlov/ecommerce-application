// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useEffect } from "react";
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
    const authContetxtApi = useAuth();
    const AuthDataStoreApi = AuthDataStore.getAuthDataStore();

    useEffect(() => {
        (async () => {
            try {
                const tokenStoreApi = AuthDataStore.getAuthDataStore();
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const isToken = tokenStoreApi.getAnonymousAccessToken();

                // TODO Start tokens logic

                const authToken = AuthDataStoreApi.getAccessAuthToken();
                if (!authToken) {
                    authContetxtApi?.setIsAuth(false);
                }
            } catch (error) {
                const AuthServiceApi = new AuthService();
                await AuthServiceApi.createAnonymousToken();
            }
        })();
        // eslint-disable-next-line
    }, []);

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
            {/* <h1>Hello,React!!!!</h1>
            <Text classes={["example", "dark", "fz-5rem", "fw-500"]}>text with classes</Text> */}
        </div>
    );
}

export default App;
