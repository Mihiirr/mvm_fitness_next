import { Context } from '@/context/authContext'
import { useRouter } from 'next/router';
import React, { useState, useEffect, useContext } from 'react'
import Header from "../components/Header"
import customStyle from "@/styles/Home.module.css"

const dashboard = () => {
    const { state } = useContext(Context);
    console.log({ state })
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
                    <h2 style={{ marginBottom: "30px" }}>Howdy, <span style={{ color: "#646464" }}> {state.user?.username}</span></h2>
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
                            <p><strong>Username:</strong> {state.user?.username}</p>
                            <p><strong>Email:</strong> {state.user?.email}</p>
                            <p><strong>Phone:</strong> {state.user?.phone}</p>
                        </div>
                    </div>
                )}
                {link === "favourite" && (
                    <div className={customStyle.mainContent_dashboard}>
                        <h2 style={{ color: "#646464" }}>FAVOURITE</h2>
                    </div>
                )}
            </div>
        </div>
    )
}

export default dashboard