require('../models')
require('mysql2')
const { User } = require('../models')
const bcrypt = require('bcrypt')

async function check_if_user_exist(username){
    const users = await User.findAll({where : {
        username : username
    }})

    return users
}

async function createUser(username, password, role){
    const users = await check_if_user_exist(username)

    if(users.length){
        throw new Error('Username already exists!')
    }

    const hashPassword = await bcrypt.hash(password, 7)

    const user = await User.create({
        username : username,
        password :  hashPassword,
        role : role
    }).catch((err) => {
        if(err) {
            throw new Error('Error222')
        }
    })

    return user 
}

async function loginUser(username, password){
    const users =  await check_if_user_exist(username)

    if(!users.length){
        throw new Error('Invalid account!')
    }

    let comaprePassword = bcrypt.compareSync(password, users[0].dataValues.password)
    if (!comaprePassword) {
        throw new Error('Incorect password!')
    }

    return users
}

module.exports = {
    createUser,
    loginUser,
}