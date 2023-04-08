import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from "axios";
import { useRouter } from 'next/router';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useForm } from 'react-hook-form';

function Copyright(props) {
    return (
        <Typography variant="body2" color="whitesmoke" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const theme = createTheme();

const styles = {
    paperContainer: {
        backgroundImage: `url('')`,
        backgroundColor: "0,0,0,0.25"
    }
};

export default function Register() {
    const { register, handleSubmit, formState: { errors }, } = useForm({
        mode: "onChange",
    });
    const router = useRouter();
    const onSubmit = async (data) => {
        if (data.password !== data.confirmpassword) {
            toast.error(`🙅🏻‍♂️ Uh oh! Password didn't matched`, {
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
            try {
                const response = axios.post('/api/register', data);
                if ((await response).data.message) {
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
                    const toastFunction = async () => {
                        await toast.success('🚀 Successfully registered.', {
                            position: "bottom-left",
                            autoClose: 3000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                        });
                        setTimeout(() => {
                            router.push("/login")
                        }, 4000);
                    }
                    await toastFunction();
                }
            } catch (error) {
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
    };

    return (
        <ThemeProvider theme={theme}>
            <Grid container component="main" sx={{ height: '100vh' }}>
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
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: 'url(https://source.unsplash.com/0ShTs8iPY28)',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <Grid item xs={12} sm={8} md={5} component={Paper} style={styles.paperContainer} elevation={6} square>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >

                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            {/* <LockOutlinedIcon /> */}
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign Up
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="username"
                                label="Username"
                                name="username"
                                autoComplete="username"
                                placeholder='Enter username'
                                {...register("username", {
                                    required: "This field is required",
                                })}
                                autoFocus
                            />
                            {errors.username && (
                                <span style={{ color: "red" }}>This field is required</span>
                            )}
                            <TextField
                                margin="normal"
                                fullWidth
                                id="phone"
                                label="Phone Number"
                                name="phone"
                                autoComplete="phone"
                                {...register("phone", {
                                    pattern: {
                                        value:
                                            /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/,
                                        message: "Please Enter a valid phone number",
                                    },
                                })}
                            />
                            {errors.phone && <span style={{ color: "red" }}>Please Enter a valid Phone number</span>}
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                type="email"
                                name="email"
                                autoComplete="email"
                                {...register("email", {
                                    required: "This field is required",
                                    pattern: {
                                        value:
                                            /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                                        message: "Please Enter a valid Email",
                                    },
                                })}
                            />
                            {errors.email && <span style={{ color: "red" }}>Please Enter a valid Email</span>}
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                {...register("password", {
                                    required: true,
                                    pattern: {
                                        value:
                                            /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
                                        message:
                                            "Password must be contain UpperCase, LowerCase, Number/special Character and min 8 charecters",
                                    },
                                })}
                            />
                            {errors.password && (
                                <span style={{ color: "red" }}>Password must be contain UpperCase, LowerCase, Number/special Character and min 8 characters</span>
                            )}
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="confirmpassword"
                                label="Confirm password"
                                type="password"
                                id="confirmpassword"
                                autoComplete="confirm-password"
                                {...register("confirmpassword", {
                                    required: true
                                })}
                            />
                            {errors.confirmpassword && (
                                <span style={{ color: "red" }}>Please confirm your password</span>
                            )}
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Sign Up
                            </Button>
                            <Grid container>
                                <Grid item>
                                    <Link href="/login" variant="body2">
                                        {"Already have an account? Sign In"}
                                    </Link>
                                </Grid>
                            </Grid>
                            <Copyright sx={{ mt: 5 }} />
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}