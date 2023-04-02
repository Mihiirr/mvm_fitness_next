import React, { useEffect, useState } from 'react';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import adminStyles from "@/styles/Admin.module.css";
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import { useRouter } from 'next/router';

const Admin = () => {
    const router = useRouter()
    const [Users, setUsers] = useState([]);
    const [Admins, setAdmins] = useState([]);

    const deleteUserHandler = async (id) => {
        try {
            const response = await axios.post('/api/deleteuser', { userId: id });
            if (response.data.message) {
                toast.error(`🤷🏻‍♂️ Uh oh! ${(await response).data.message}`, {
                    position: "bottom-left",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            } else {
                toast.success('🚀 Successfully Deleted user.', {
                    position: "bottom-left",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }
        } catch {
            console.log("delete hit catch");
            toast.error(`🤷🏻‍♂️ Somthing went wrong! Please try again.`, {
                position: "bottom-left",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    }

    useEffect(() => {
        const checkuser = () => {
            if (typeof window !== undefined) {
                if (!localStorage.getItem("auth-token")) {
                    router.push("/login");
                }
            }
        }
        const fetchAllUsers = async () => {
            const users = await axios.get('/api/getalluser');
            setUsers(users.data.filter((item) => item.isAdmin === false));
            setAdmins(users.data.filter((item) => item.isAdmin === true));
        }
        checkuser();
        fetchAllUsers();
    }, []);



    return (
        <div>
            <Header />
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
            />
            <div style={{ minHeight: "60vh", maxWidth: "80%", margin: "auto" }}>
                <div style={{ marginTop: "150px" }}>
                    <h1>Users</h1>
                    <TableContainer sx={{ mt: "30px" }} component={Paper}>
                        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: "700" }}>Email</TableCell>
                                    <TableCell sx={{ fontWeight: "700" }} align="right">Username</TableCell>
                                    <TableCell sx={{ fontWeight: "700" }} align="right">Phone</TableCell>
                                    <TableCell sx={{ fontWeight: "700" }} align="right">Height</TableCell>
                                    <TableCell sx={{ fontWeight: "700" }} align="right">Weight</TableCell>
                                    <TableCell sx={{ fontWeight: "700" }} align="right">Update</TableCell>
                                    <TableCell sx={{ fontWeight: "700" }} align="right">Delete</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {Users.map((item) => (
                                    <TableRow
                                        key={item._id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {item.email}
                                        </TableCell>
                                        <TableCell align="right">{item.username}</TableCell>
                                        <TableCell align="right">{item.phone}</TableCell>
                                        <TableCell align="right">{item.height ? item.height : "Not provided"}</TableCell>
                                        <TableCell align="right">{item.weight ? item.weight : "Not provided"}</TableCell>
                                        <TableCell align="right"><Button variant="outlined" color="info">UPDATE</Button></TableCell>
                                        <TableCell align="right"><Button variant="contained" color="secondary" onClick={() => deleteUserHandler(item._id)}>DELETE</Button></TableCell>

                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
                <div style={{ marginTop: "100px" }}>
                    <h1>Admins</h1>
                    <TableContainer sx={{ mt: "30px" }} component={Paper}>
                        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: "700" }}>Email</TableCell>
                                    <TableCell sx={{ fontWeight: "700" }} align="right">Username</TableCell>
                                    <TableCell sx={{ fontWeight: "700" }} align="right">Phone</TableCell>
                                    <TableCell sx={{ fontWeight: "700" }} align="right">Height</TableCell>
                                    <TableCell sx={{ fontWeight: "700" }} align="right">Weight</TableCell>
                                    <TableCell sx={{ fontWeight: "700" }} align="right">Update</TableCell>
                                    <TableCell sx={{ fontWeight: "700" }} align="right">Delete</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {Admins.map((item) => (
                                    <TableRow
                                        key={item._id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {item.email}
                                        </TableCell>
                                        <TableCell align="right">{item.username}</TableCell>
                                        <TableCell align="right">{item.phone}</TableCell>
                                        <TableCell align="right">{item.height ? item.height : "Not provided"}</TableCell>
                                        <TableCell align="right">{item.weight ? item.weight : "Not provided"}</TableCell>
                                        <TableCell align="right"><Button variant="outlined" color="info">UPDATE</Button></TableCell>
                                        <TableCell align="right"><Button variant="contained" color="secondary" onClick={() => deleteUserHandler(item._id)}>DELETE</Button></TableCell>

                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Admin;