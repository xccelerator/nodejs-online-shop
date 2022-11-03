require('mysql2')
const { Brand } = require('../models')

async function createBrand(name){
    const brand = await Brand.create({
        name : name,
    }).catch((err) => {
        if(err){
            throw new Error('Error')
        }
    })

    return brand
}

async function findBrand(name){
    const brand = await Brand.findAll({ where : {
        name : name
    } })

    return brand
}

async function updateBrandName(oldName, newName){
    try{
        const brand = await findBrand(oldName)

        await brand[0].update({
            name : newName,
        })

        return true
    }catch{
        throw new Error('This brand does not exist!')
    }
}

module.exports = {
    createBrand,
    findBrand,
    updateBrandName,
}