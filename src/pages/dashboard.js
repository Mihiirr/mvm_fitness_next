import { Context } from '@/context/authContext'
import { useRouter } from 'next/router';
import React, { useState, useEffect, useContext } from 'react'
import Header from "../components/Header"
import customStyle from "@/styles/Dashboard.module.css"
import Link from 'next/link';

const dashboard = () => {
    const { state } = useContext(Context);
    const [link, setLink] = useState("dashboard");
    const router = useRouter();
    useEffect(() => {
        const token = localStorage.getItem("auth-token");
        if (!token) {
            router.push("/");
        }
    }, [])
    return (
        <div>
            <Header />
            <div className={customStyle.dashboard}>

                {/* Sidebar */}
                <div className={customStyle.sidebar_dashboard}>
                    <h2 style={{ marginBottom: "30px" }}>Howdy, <span style={{ color: "#646464" }}> {state.userInfo ? state.userInfo.username : "Loading..."}</span></h2>
                    <button onClick={() => setLink("dashboard")} className={link === "dashboard" ? customStyle.sidebar_dashboard_links_active : customStyle.sidebar_dashboard_links}>
                        <p>My Dashboard</p>
                    </button>
                    <button onClick={() => setLink("favourite")} className={link === "favourite" ? customStyle.sidebar_dashboard_links_active : customStyle.sidebar_dashboard_links}>
                        <p>Favourites</p>
                    </button>

                </div>
                {/* Main Content */}
                {link === "dashboard" && (
                    <div className={customStyle.mainContent_dashboard}>
                        <h2 style={{ color: "#646464" }}>DASHBOARD</h2>
                        <div className={customStyle.dashboard_details}>
                            <p><strong>Username:</strong> {state.userInfo ? state.userInfo.username : "Loading..."}</p>
                            <p><strong>Email:</strong> {state.userInfo ? state.userInfo.email : "Loading..."}</p>
                            <p><strong>Phone:</strong> {state.userInfo ? state.userInfo.phone : "Loading..."}</p>
                            <p><strong>Gender:</strong> {state.userInfo?.gender ? state.userInfo.gender : "Not provided"}</p>
                            <p><strong>Height:</strong> {state.userInfo?.height ? state.userInfo.height : "Not provided"}</p>
                            <p><strong>Weight:</strong> {state.userInfo?.weight ? state.userInfo.weight : "Not provided"}</p>
                        </div>
                    </div>
                )}
                {link === "favourite" && (
                    <div className={customStyle.mainContent_dashboard}>
                        <h2 style={{ color: "#646464" }}>FAVOURITE</h2>
                        {!state.userInfo.favourites.length ? (
                            <p className={customStyle.nothingToShow}>
                                Uh oh! Nothing is here to show.
                            </p>
                        ) : (
                            <div className={customStyle.exe_fav_card_contianer}>
                                {state.userInfo.favourites.map((fav) => (
                                    <Link style={{ textDecoration: "none" }} href={`/exercise/${fav.id}`}>
                                        {/* Exercise Card */}
                                        <div className={customStyle.exercise_fav_card}>
                                            <img src={fav.gifUrl} alt={fav.name} loading="lazy" height="250px" width="290px" />
                                            <p className={customStyle.exe_fav_card_title}>{fav.name}</p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}

export default dashboard