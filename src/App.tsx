import React from "react";
import Header from "view/app-components/Header/Header";
import Footer from "view/app-components/Footer/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppRoutes from "view/app-components/AppRoutes";

function App() {
    return (
        <div>
            <Header />
            <ToastContainer
                position="top-center"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <AppRoutes />
            <Footer />
        </div>
    );
}

export default App;
