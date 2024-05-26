const JWT = require('jsonwebtoken')

module.exports = async (req, res, next) => {
    try {
        const token = req.headers['authorization'].split(" ")[1]
        JWT.verify(token, process.env.JWT, (err, decode) => {
            if (err) {
                return res.status(200).send({
                    success: false,
                    message: "Authentication failed"
                })
            } else {
                req.body.user_id = decode.id
                next()
            }
        })
    } catch (error) {
        console.error(error)
        res.status(401).send({
            success: false,
            message: "Authentication failed"
        })
    }
}