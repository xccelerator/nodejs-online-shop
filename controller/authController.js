require('dotenv').config()
const jwt = require('jsonwebtoken')
const { createUser, loginUser } = require('./service')

const createToken = (username, role) => {
    return jwt.sign({username, role}, process.env.JWT_SECRET_KEY, {
        expiresIn : '24h'
    })
}

async function registerPost(req, res, next){
    const {username, password, role} = req.body

    try{
        const user = await createUser(username, password, role)

        if(Object.keys(user).length){
            const token = createToken(username, user.dataValues.role)
            return res.json({token})
        }

        return res.status(502).json({message : 'Error111'})
    } catch (err){
        return res.status(502).json({message : err.message})
    }

    
}

async function loginPost(req, res, next){
    const {username, password} = req.body

    try{
        const user = await loginUser(username, password)

        if(user.length){
            const token = createToken(username, user[0].dataValues.role)
            return res.json({token})
        }

        return res.status(502).json({message : 'Error'})
    } catch(err){
        return res.status(502).json({message : err.message})
    }
}


function secretGet(req,res){
   res.send('Secret page')
}

module.exports = {
    registerPost,
    loginPost,
    secretGet
} 