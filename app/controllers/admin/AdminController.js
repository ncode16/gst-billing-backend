const { pool } = require('../../../config/database')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Pagination = require('../../../config/config')
const sendgridTransport = require('nodemailer-sendgrid-transport')
const nodemailer = require('nodemailer')
const randomString = require('randomstring')
const UserService = require('../../services/UserService')

const transporter = nodemailer.createTransport(
    sendgridTransport({
        auth: {
            api_key: process.env.SENDGRID_API_KEY,
        },
    })
)

exports.createAdmin = async (req, res) => {
    try {
        let password = await bcrypt.hash(req.body.password, 10)
        let sql = `INSERT INTO admin_master (first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING *`

        let result = await pool.query(sql, [
            req.body.firstName,
            req.body.lastName,
            req.body.email,
            password,
        ])

        return res.json({
            statusCode: 200,
            success: true,
            data: result.rows[0],
            message: 'Admin Added Successfully'
        })
    } catch (error) {
        console.log('error', error)
    }
}

exports.adminLogin = async (req, res) => {
    try {
        let users = await pool.query('SELECT * FROM admin_master WHERE email = $1', [req.body.email])
        if (users.rows.length === 0) {
            return res.json({
                statusCode: 400,
                success: false,
                message: 'Email is not valid'
            })
        }

        if (!bcrypt.compareSync(req.body.password, users.rows[0].password)) {
            return res.json({
                statusCode: 400,
                success: false,
                message: 'Password does not match'
            })
        } else {
            let token = jwt.sign({
                _id: users.rows[0]._id,
                first_name: users.rows[0].first_name,
                last_name: users.rows[0].last_name,
                email: users.rows[0].email,
            }, process.env.JWT_SECRET, { expiresIn: 86400 })

            let user = {
                accessToken: token,
                userData: {
                    ability: [
                        {
                            action: 'manage',
                            subject: 'all'
                        }
                    ],
                    id: users.rows[0].admin_id,
                    fullName: users.rows[0].first_name + ' ' + users.rows[0].last_name,
                    // first_name: users.rows[0].first_name,
                    // last_name: users.rows[0].last_name,
                    email: users.rows[0].email,
                },
            }
            return res.json({
                statusCode: 200,
                success: true,
                data: user,
                message: 'Admin Login Successfully'
            })
        }
    } catch (error) {
        console.log('error', error)
    }
}

exports.getFaqAndFeatureList = async (req, res) => {
    try {
        let resultFeature = await pool.query('SELECT * FROM feature_master')
        let resultFaq = await pool.query('SELECT * FROM faq_master')

        let finalList = {
            featureDetail: resultFeature.rows,
            faqDetail: resultFaq.rows,
        }

        return res.json({
            statusCode: 200,
            success: true,
            data: finalList,
            message: 'Data Retrived Successfully'
        })
    } catch (error) {
        console.log('error', error)
    }
}

exports.getAllUser = async (req, res) => {
    try {
        let resultUser = await pool.query('SELECT * FROM user_master WHERE is_deleted = $1 ORDER BY user_id', [false])
        let finalResultUser = await Pagination.paginator(resultUser.rows, req.body.page, req.body.limit)
        return res.json({
            statusCode: 200,
            success: true,
            data: finalResultUser,
            message: 'Data Retrived Successfully'
        })
    } catch (error) {
        console.log('error', error)
    }
}

exports.editUser = async (req, res) => {
    try {
        let resultUser = await pool.query('SELECT * FROM user_master WHERE user_id = $1', [req.params.userId])
        return res.json({
            statusCode: 200,
            success: true,
            data: resultUser.rows[0],
            message: 'Data Retrived Successfully'
        })
    } catch (error) {
        console.log('error', error)
    }
}

exports.updateUser = async (req, res) => {
    try {
        let query = await UserService.updateUser(req.params.userId, req.body)
        let colValues = Object.keys(req.body).map((key) => {
            return req.body[key];
        });
        await pool.query(query, colValues)
        return res.json({
            statusCode: 200,
            success: true,
            message: 'User Updated Successfully'
        })
    } catch (error) {
        console.log('error', error)
    }
}

exports.deleteUser = async (req, res) => {
    try {
        await pool.query('UPDATE user_master SET is_deleted = $1 WHERE user_id = $2', [true, req.params.userId])
        return res.json({
            statusCode: 200,
            success: true,
            message: 'User Deleted Successfully'
        })
    } catch (error) {
        console.log('error', error)
    }
}

exports.activeInactiveUser = async (req, res) => {
    try {
        await pool.query('UPDATE user_master SET is_active = $1 WHERE user_id = $2', [req.body.isActive, req.params.userId])
        if (req.body.isActive == true) {
            return res.json({
                statusCode: 200,
                success: true,
                message: 'User Activated Successfully'
            })
        } else {
            return res.json({
                statusCode: 200,
                success: true,
                message: 'User Deactivated Successfully'
            })
        }
    } catch (error) {
        console.log('error', error)
    }
}

exports.forgotPassword = async (req, res) => {
    try {
        let email = await pool.query('SELECT email from admin_master WHERE email = $1', [req.body.email])
        if (email.rows.length == 0) {
            return res.json({
                success: true,
                statusCode: 400,
                message: 'Email is not valid',
            })
        }
        const data = {
            from: 'jobemployer97@gmail.com',
            to: req.body.email,
            subject: 'Password Reset Link',
            template: 'forgot-password',
            html: `<p>
                        Your reset password link is
                        <a href= ${process.env.CLIENT_URL}/reset-password>Reset Password</a>
                   </p>`
        }

        await pool.query('UPDATE admin_master SET reset_token = $1', [randomString.generate()])

        transporter.sendMail(data, (err, body) => {
            if (err) {
                return res.json({ error: err.message })
            }
            return res.json({
                success: true,
                statusCode: 200,
                message: 'Email has been sent, kindly Follow the instruction',
            })
        })
    } catch (error) {
        console.log('error', error)
    }
}

exports.resetPassword = async (req, res) => {
    try {
        const { resetToken, newPassword, confirmPassword } = req.body;
        jwt.verify(
            resetToken,
            process.env.JWT_SECRET,
            async (err, decoded) => {
                if (err) {
                    return res.status(401).json({
                        error: "Expired Link. Try again",
                    });
                }

                await pool.query('SELECT reset_token from admin_master WHERE reset_token = $1', [resetToken])
                    .then((user) => {
                        if (!user) {
                            return res.status(400).json({
                                error: "Something went wrong. Try later",
                            });
                        }
                        if (newPassword === confirmPassword) {
                            bcrypt.hash(newPassword, 12, async (err, hash) => {
                                if (err) {
                                    return res.status(500).json({
                                        error: err,
                                    });
                                } else {
                                    await pool.query('UPDATE admin_master SET reset_token = $1 AND password = $2', [null, hash])
                                    return res.json({
                                        success: true,
                                        statusCode: 200,
                                        msg: "Password reset successfully",
                                    });
                                }
                            });
                        } else {
                            return res.status(400).json({
                                error: "New password and Confirm password does not match",
                            });
                        }
                    })
                    .catch((err) => {
                        console.log("error", err);
                    });
            }
        );
    } catch (error) {
        console.log('error', error)
    }
}