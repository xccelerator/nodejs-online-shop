require('dotenv').config()
const jwt = require('jsonwebtoken')

function checkUser(req, res, next){
    const token = req.headers.authorization.split(' ')[1]
    if(!token) return res.json({message: "Not Authorized!"})

    jwt.verify(token, process.env.JWT_SECRET_KEY,(err, decodedToken) => {
        if(err) return next(res.json({message :"Wrong Token!"}))
        req.user = decodedToken
        next()
    })
}

module.exports = {
    checkUser
}