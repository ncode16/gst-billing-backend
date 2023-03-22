import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';



const theme = createTheme();

const ContextLogin = React.createContext();
export default function SignIn() {

    const [error, setError] = useState('');
    const [error1, setError1] = useState('');
    const[number , setNumber] =useState(0);

   


    function otpForMobile(e){
        setNumber(e.target.value);
    }
    const phonenumber=()=>{
       
        var Contact = document.getElementById("contact2").value;
        if (Contact == "" && number.length != 10) {
            setError('Please enter your 10 digit mobile number')
        } else if (number.length != 10) {
            setError1('Please enter your 10 digit mobile number')
        } else  {
            navigate('/otp', {state:{MobileNo: number}})
        }
        axios.post('/api/user/login', {
            "mobileNumber": number
        })
            .then((responce) => 
           {
            const LoginData = responce.data;
            console.log('Login-Data',LoginData)
        }
            )
            .catch((e) =>
                console.log('err', e))
    }


    const navigate = useNavigate();
    return (
        <div className='container2'  >

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
                                <form>
                                    <Box component="form">
                                        <div className='mobileNumberContainer'>
                                            <div className='countryCode'>
                                                <div>+91</div>
                                            </div>
                                            <div className='mobileNumber'>
                                                <input
                                                 onChange={otpForMobile}
                                                    id='contact2'
                                                    type="text"
                                                    name="number"
                                                    maxLength='10'
                                                    autoComplete="number"
                                                    placeholder="10 digit mobile number"
                                                    fullWidth
                                                    autoFocus
                                                    inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                                                    sx={{ pb: 2 }}
                                                />

                                            </div>
                                        </div>
                                        <p className='text-denger'>{error?error:error1}</p>
                                        
                                        

                                        <div className='otpMessage'>
                                            <p>We will be sending an OTP to this number</p>
                                        </div>

                                        <Button
                                            onClick={phonenumber}
                                            id='submit'
                                            type="button"
                                            fullWidth
                                            variant="contained"
                                            sx={{ mt: 3, mb: 2 }}

                                        >
                                            Continue with Mobile Number
                                        </Button>
                                    </Box>
                                </form>
                            </Box>
                        </Container>
                    </ThemeProvider>
                </div>
            </div>
        </div>

    );
}