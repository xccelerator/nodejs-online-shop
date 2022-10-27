require('../models')
require('mysql2')
const { Op } = require('sequelize')
const { User, Product, Brand } = require('../models')
const bcrypt = require('bcrypt')

async function check_if_user_exist(username){
    const users = await User.findAll({where : {
        username : username
    }})

    return users
}

async function findItem(name, price){
    const item = await Product.findOne({where : {
        denumire : name,
        cost : price 
    }})

    return item
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

async function addItem(name, price, brand){
    await Product.create({
        denumire : name,
        cost : price,
        brandName : brand
    }).catch((err) => {
        if(err){
            throw new Error('Error')
        }
    })

    return true
}

async function updatePrice(name, oldPrice, newPrice){
    try{
        const item = await findItem(name, oldPrice)

        await item.update({
            cost : newPrice
        })

        return true
    }catch{
        throw new Error('This item does not exist!')
    }
}

async function searchBy(minPrice, maxPrice){
    try {
        if(minPrice > maxPrice) {
            throw new Error('Min price must be higher than Max Price') 
        }

        const products = await Product.findAll({ where : {
            cost : {
                [Op.between] : [minPrice, maxPrice]
            }
        } }) 

        return products
    } catch(err) {
       throw new Error(err) 
    }
}

async function createBrand(brandName){
    const brands = await Brand.findAll({where : {
        brandName : brandName
    }})

    if(brands.length){
        throw new Error('Brand already exists!')
    }

    const brand = await Brand.create({
        brandName :  brandName
    }).catch((err) => {
        if(err) {
            throw new Error('Error')
        }
    })

    return brand  
}

module.exports = {
    createUser,
    loginUser,
    addItem,
    findItem,
    updatePrice,
    searchBy,
    createBrand
}