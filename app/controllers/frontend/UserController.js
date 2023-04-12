const { pool } = require('../../../config/database')
const { Validator } = require('node-input-validator')
const UserService = require('../../services/UserService')
const unirest = require('unirest')
const jwt = require('jsonwebtoken')

exports.login = async (req, res) => {
    try {
        let users = await pool.query('SELECT * FROM user_master WHERE mobile_number = $1', [req.body.mobileNumber])
        let otp = Math.floor(100000 + Math.random() * 900000)
        var request = unirest("POST", "https://www.fast2sms.com/dev/bulkV2");
        request.headers({
            "authorization": process.env.FAST2SMS_AUTHORIZATION
        });

        request.form({
            "variables_values": otp,
            "route": "otp",
            "numbers": req.body.mobileNumber,
        });
        request.end(async (response) => {
            if (response.error) throw new Error(response.error);

            if (users.rows.length > 0) {
                if (users.rows.length === 0) {
                    return res.status(400).json({
                        success: false,
                        message: 'Email is not valid'
                    })
                }
                var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
                if (req.body.mobileNumber !== '' && phoneno.test(req.body.mobileNumber)) {
                    let token = jwt.sign({
                        _id: users.rows[0]._id,
                        first_name: users.rows[0].first_name,
                    }, process.env.JWT_SECRET, { expiresIn: 86400 })

                    let user = {
                        token,
                        first_name: users.rows[0].first_name,
                        last_name: users.rows[0].last_name,
                        email: users.rows[0].email,
                        mobile_number: users.rows[0].mobile_number,
                        user_otp: otp,
                    }
                    await UserService.resendOtp(users.rows[0].user_id, otp)
                    return res.status(200).json({
                        success: true,
                        data: user,
                        message: 'User Login Successfully'
                    })
                } else {
                    return res.status(400).json({
                        success: false,
                        message: 'Mobile Number is not valid'
                    })
                }
            } else {
                let v = new Validator(req.body, {
                    mobileNumber: 'required',
                })

                let matched = await v.check()
                if (!matched) {
                    return res.status(400).json({
                        success: false,
                        message: v.errors
                    })
                }
                var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
                if (req.body.mobileNumber !== '' && phoneno.test(req.body.mobileNumber)) {
                    let result = await UserService.createUser(req.body.mobileNumber, otp)
                    return res.status(200).json({
                        success: true,
                        data: result.rows[0],
                        message: 'User Register Successfully'
                    })
                } else {
                    return res.status(400).json({
                        success: false,
                        message: 'Mobile Number is not valid'
                    })
                }
            }
        });
    } catch (error) {
        console.log('error', error)
    }
}

exports.verifyMobileOtp = async (req, res) => {
    try {
        let user = await pool.query('SELECT mobile_number, user_otp FROM user_master WHERE mobile_number = $1', [req.body.mobileNumber])
        if (user.rows && req.body.mobileOtpValue === user.rows[0].user_otp) {
            return res.status(200).json({
                success: true,
                message: 'OTP verified successfully',
            })
        } else {
            return res.status(400).json({
                success: false,
                message: 'Invalid OTP',
            })
        }
    } catch (error) {
        console.log('error', error)
        return res.status(400).json({
            success: false,
            message: error,
            data: [],
        })
    }
}

exports.resendMobileOtp = async (req, res) => {
    try {
        let user = await pool.query('SELECT user_id, mobile_number FROM user_master')
        let otp = Math.floor(100000 + Math.random() * 900000)
        var method = unirest("POST", "https://www.fast2sms.com/dev/bulkV2");
        method.headers({
            "authorization": process.env.FAST2SMS_AUTHORIZATION
        });

        method.form({
            "variables_values": otp,
            "route": "otp",
            "numbers": user.rows[0].mobile_number,
        });
        method.end(async (response) => {
            if (response.error) throw new Error(response.error);
            await UserService.resendOtp(user.rows[0].user_id, otp)

            return res.status(200).json({
                success: true,
                message: 'OTP resend successfully'
            })
        });
    } catch (error) {
        console.log('error', error)
        return res.status(400).json({
            success: false,
            message: err,
            data: [],
        })
    }
}

exports.updateUserProfile = async (req, res) => {
    try {
        let v = new Validator(req.body, {
            username: 'required'
        })

        let matched = v.check()
        if (!matched) {
            return res.status(400).json({
                success: false,
                data: [],
                message: v.errors()
            })
        }

        await pool.query('UPDATE user_master SET first_name = $1, email = $2 WHERE user_id = $3', [req.body.username, req.body.email, req.params.userId])
        return res.status(200).json({
            success: true,
            message: 'User Profile Updated successfully'
        })
    } catch (error) {
        console.log('error', error)
    }
}

exports.getUserProfile = async (req, res) => {
    try {
        let getUser = await pool.query('SELECT * FROM user_master WHERE user_id = $1', [req.params.userId])
        return res.status(200).json({
            success: true,
            data: getUser.rows[0],
            message: 'Data Retrived successfully'
        })
    } catch (error) {
        console.log('error', error)
    }
}

exports.sendPurchaseSms = async (req, res) => {
    try {
        var sms_request = unirest("POST", "https://www.fast2sms.com/dev/bulkV2");
        sms_request.headers({
            "authorization": process.env.FAST2SMS_AUTHORIZATION
        });

        sms_request.form({
            "message": req.body.message,
            "language": "english",
            "route": "q",
            "numbers": req.body.mobileNumber,
        });
        sms_request.end((response) => {
            if (response.error) throw new Error(response.error);
            return res.status(200).json({
                success: true,
                message: 'SMS Sent successfully'
            })
        })
    } catch (error) {
        console.log('error', error)
    }
}