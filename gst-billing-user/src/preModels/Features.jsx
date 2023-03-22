import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './Login.css';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import SignIn from './LoginPage';
import axios from 'axios';
import { useState, useEffect } from 'react';
import ResendOtp from './Resend';




const theme = createTheme();

export default function Otp() {
    const [otp, setOtp] = useState(0);
    const [data1, setData] = useState('');
    const location = useLocation();
   
     let MobileNumber = location.state.MobileNo


    function VerifyOtp() {

       
        if (otp == otp.user_otp ) {
            alert('wrong otp')
        }
        else {
            navigate('/welcome')
        }
            axios.post('http://10.16.16.11:8000/api/user/verify-mobile-otp', {
                mobileNumber: MobileNumber,
                mobileOtpValue: otp

            })
                .then((res) => {
                    console.log('Otp-data',res.data);
                }
                )
                .catch((e) =>
                    console.log('err', e))

    }
   

    function otpForM(e) {
        setOtp(parseInt(e.target.value));
    }
   
    const navigate = useNavigate();

    return (
        <div className='container2'>
    
            <div id='para'>
                <span> GST Billing</span>
            </div>
            <div className='center'>
                <div className='center2'>
                    <ThemeProvider theme={theme}>

                        <Container component="main" maxWidth="xs">
                            <CssBaseline />
                            <Box
                                sx={{
                                    marginTop: 8,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                }}
                            >
                                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>

                                </Avatar>
                                <Typography component="h1" variant="h5"
                                    sx={{ pb: 5 }}
                                >
                                    Welcome to GST Billing
                                </Typography>
                                <Box component="form"  >
                                    <div className='mobileNumberContainer'>

                                        <div className='mobileNumber'>
                                            <input
                                                onChange={otpForM}
                                                type="text"
                                                id='Otp1'
                                                name="number"
                                                maxLength='4'
                                                autoComplete="number"
                                                placeholder="4 Digit OTP"
                                                fullWidth
                                                autoFocus
                                                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                                                sx={{ pb: 2 }}
                                            />
                                        </div>
                                    </div>

                                    <div className='otpMessage'>
                                        <p>OTP send to the given number. <Link onClick={() => navigate(-1)} >Edit</Link> </p>
                                    </div>

                                    <Button
                                        onClick={VerifyOtp}
                                        type="button"
                                        fullWidth
                                        variant="contained"
                                        sx={{ mt: 3, mb: 2 }}
                                    // onClick={()=>{
                                    //     alert('Thank you')
                                    // }

                                    // }
                                    >
                                        Confirm OTP
                                    </Button>
                                    <ResendOtp />

                                </Box>

                            </Box>
                        </Container>
                    </ThemeProvider>
                </div>
            </div>
        </div>

    );
}