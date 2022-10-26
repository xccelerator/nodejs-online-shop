require('dotenv').config()
const jwt = require('jsonwebtoken')

function checkToken(bearerToken){
    if(!bearerToken){
        return false
    }

    const token = bearerToken.split(' ')[1]
    if(!token){
        return false
    }

    return token 
}


function checkAuth(req, res, next){
    const token = checkToken(req.headers.authorization)

    if(token){
        try{
            const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
            req.user = decoded
            next()
        }catch(err){
            return res.json({message : "Wrong Token!"})
        }
    } else {
        return res.json({message : "Not Authorized!"})
    }
}

function checkAdmin(role){
    return function (req,res,next){
        const token = checkToken(req.headers.authorization)

        if(token){
            try{
                const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)

                if(decoded.role !== role){
                    return res.json({message : "Only admin have permission!"})
                }

                req.user = decoded
                next()
            }catch(err){
                return res.json({message : "Wrong Token!"})
            }
        } else {
            return res.json({message : "Not Authorized!"})
        }
    }
}

module.exports = {
   checkAuth,
   checkAdmin
}