import React, { useState, useEffect, useContext } from 'react';
import { AppBar, Button, Toolbar } from '@material-ui/core';
import Box from '@mui/material/Box';
import customStyles from "@/styles/Home.module.css"
import { Context } from '@/context/authContext';
import Link from 'next/link';
import Cookies from 'js-cookie';

const navItems = [
    {
        name: "Home",
        href: "/home"
    },
    {
        name: "Dashboard",
        href: "/dashboard"
    }
];

const Header = () => {
    const [IsLoggedin, setIsLoggedin] = useState(false);
    const { state, dispatch } = useContext(Context);
    useEffect(() => {
        const token = localStorage.getItem("auth-token");
        if (!token) {
            setIsLoggedin(false);
        } else {
            setIsLoggedin(true);
        }
    }, []);

    const logout = async () => {
        await localStorage.removeItem("auth-token");
        await Cookies.remove("userInfo");
        await dispatch({
            type: "UPDATE_STATE",
            payload: {}
        });
    }

    return (
        <AppBar className={customStyles.header} color="transparent" elevation={4} id="header" >
            <Toolbar className={customStyles.appbarWrapper}>
                <h1 className={customStyles.appbarTitle}>
                    MVM_<span className={customStyles.colorText}>FITNESS</span>
                </h1>
                {IsLoggedin && (
                    <Box sx={{ display: { xs: 'none', sm: 'block' } }} mr={3}>
                        {navItems.map((item) => (
                            <Link key={item.name} style={{ color: "rgb(118 118 118)" }} className={customStyles.links} href={item.href}>
                                {item.name}
                            </Link>
                        ))}
                        {state.userInfo?.isAdmin && (
                            <Link style={{ color: "rgb(118 118 118)" }} className={customStyles.links} href="/admin">
                                Admin Panel
                            </Link>
                        )}
                    </Box>
                )}
                {IsLoggedin ?
                    <Button variant='contained' color="inherit" onClick={logout} href='/'>SIGN Out</Button> : <Button variant='contained' color="default" href='/login'>SIGN IN</Button>}
            </Toolbar>
        </AppBar >
    )
}

export default Header