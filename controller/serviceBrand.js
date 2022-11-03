require('mysql2')
const { Brand } = require('../models')

async function createBrand(name){
    const brand = await Brand.create({
        brandName : name,
    }).catch((err) => {
        if(err){
            throw new Error('Error')
        }
    })

    return brand
}

async function findBrand(name){
    const brand = await Brand.findAll({ where : {
        brandName : name
    } })

    return brand
}

async function updateBrandName(oldName, newName){
    try{
        const brand = await findBrand(oldName)

        await brand[0].update({
            brandName : newName,
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