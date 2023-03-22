const jwt = require('jsonwebtoken')

module.exports = function () {
    return function (req, res, next) {
        try {
            if (req.headers.authorization == undefined || req.headers.authorization == 'undefined') {
                return res.json({
                    statusCode: 400,
                    success: false,
                    message: 'Please Enter Token'
                })
            }

            let decoded = jwt.verify(req.headers.authorization, process.env.JWT_SECRET)
            req.user = decoded
            next()
        } catch (error) {
            return res.json({
                statusCode: 400,
                success: false,
                message: 'Token is not valid'
            })
        }
    }
}