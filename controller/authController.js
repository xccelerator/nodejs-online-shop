require('dotenv').config()
const jwt = require('jsonwebtoken')
const { createUser, loginUser } = require('./service')

const createToken = (username) => {
    return jwt.sign({username}, process.env.JWT_SECRET_KEY, {
        expiresIn : '24h'
    })
}

async function registerPost(req, res, next){
    const {username, password} = req.body

    try{
        const user = await createUser(username, password)

        if(!user){
            const token = createToken(username)
            return res.json({token})
        }

        return res.status(502).json({message : 'Error'})
    } catch (err){
        return res.status(502).json({message : err.message})
    }

    
}

async function loginPost(req, res, next){
    const {username, password} = req.body

    try{
        const user = await loginUser(username, password)

        console.log(user)

        if(user){
            const token = createToken(username)
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