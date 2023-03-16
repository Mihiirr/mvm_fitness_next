import React, { useState, useEffect } from 'react';
import { AppBar, Button, Toolbar } from '@material-ui/core';
import Box from '@mui/material/Box';
import customStyles from "../styles/Home.module.css"

const navItems = [
    {
        name: "Home",
        href: "/home"
    },
    {
        name: "Exercises",
        href: "/execises"
    },
    {
        name: "Dashboard",
        href: "/dashboard"
    }
];

const Header = () => {
    const [IsLoggedin, setIsLoggedin] = useState(false);
    const token = true
    useEffect(() => {

        const checkUser = () => {
            if (token) {
                setIsLoggedin(true)
            } else {
                setIsLoggedin(false)
            }
        }
        checkUser();
    }, [token])

    const logout = () => {
        localStorage.removeItem("auth-token");
    }

    return (
        <AppBar className={customStyles.header} color="transparent" elevation={4} >
            <Toolbar className={customStyles.appbarWrapper}>
                <h1 className={customStyles.appbarTitle}>
                    MVM_<span className={customStyles.colorText}>FITNESS</span>
                </h1>
                {IsLoggedin && (
                    <Box sx={{ display: { xs: 'none', sm: 'block' } }} mr={3}>
                        {navItems.map((item) => (
                            <Button key={item.name} className={customStyles.links} href={item.href}>
                                {item.name}
                            </Button>
                        ))}
                    </Box>
                )}
                {IsLoggedin ?
                    <Button variant='contained' color='success' onClick={logout} href='/'>SIGN Out</Button> : <Button variant='contained' color='success' href='/signin'>SIGN IN</Button>}
            </Toolbar>
        </AppBar>
    )
}

export default Header