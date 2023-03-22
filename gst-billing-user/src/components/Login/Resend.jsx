import React from "react";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from "axios";

function ResendOtp() {
    function verifyOtp2() {
        axios.post('http://10.16.16.11:8000/api/user/resend-mobile-otp')
            .then((res) => {
                console.log('resended otp', res.data)

            }
            )
            .catch((e) =>
                console.log('err in resendOtp', e))
    }
    return (
        <div>
            <Link onClick={verifyOtp2} className='text-center'>Resend OTP</Link>
        </div>
    )
}
export default ResendOtp;