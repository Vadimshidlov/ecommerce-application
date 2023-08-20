import React from "react";
import "view/app-components/MainPage/style.scss";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AxiosAnonymousFlow from "service/AxiosAnonymousFlow";

export default function MainPage() {
    return (
        <div className="main-page">
            <div className="main-part">
                {/* some content start */}
                <ToastContainer
                    position="top-center"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                />
                <div className="some-contant" style={{ maxWidth: "40%", marginLeft: "3rem" }}>
                    <h4>New Arrivals</h4>
                    <h3>Create your dream shop instantly.</h3>
                    <p>
                        Keep your everyday style chic and on-trend with our selection 20+ styles to
                        choose from.
                    </p>
                    <button
                        type="button"
                        onClick={async () => {
                            const axiosAnonApi = AxiosAnonymousFlow;

                            try {
                                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                const request = await axiosAnonApi.get<any>(
                                    "https://api.europe-west1.gcp.commercetools.com/uwoc_ecm-app/product-projections",
                                    {
                                        // headers: {
                                        //     Authorization: `Basic ${localStorage.getItem(
                                        //         "anonymousAccessToken",
                                        //     )}`,
                                        // },
                                    },
                                );

                                return request.data?.results;
                            } catch (e) {
                                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                const request = await axiosAnonApi.get<any>(
                                    "https://api.europe-west1.gcp.commercetools.com/uwoc_ecm-app/product-projections",
                                    {
                                        headers: {
                                            Authorization: `Bearer ${localStorage.getItem(
                                                "anonymousAccessToken",
                                            )}`,
                                        },
                                    },
                                );

                                return request.data?.results;
                            }

                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        }}
                    >
                        See Collection
                    </button>
                    {/* some content end */}
                </div>
            </div>
        </div>
    );
}
