require('mysql2')
const { Product } = require('../models')

//async function addProduct(name, price, brandId, img){
async function addProduct(name, price, brandId){
    const prod= await Product.create({
        name : name,
        price : price,
        BrandId : brandId,
        //img : img
    }).catch((err) => {
        if(err){
            throw new Error('Error')
        }
    })

    return prod  
}

async function findProduct(name){
    const product = await Product.findAll({ where: {
        name : name
    }})

    return product
}

async function updateProductPrice(name, newPrice){
    try{
        const product = await findProduct(name)

        await product[0].update({
            price : newPrice
        })
    }catch(err){
        throw new Error('This poduct does not exist!')
    }
}

function createDescription(detail){
    ProductInfo.create({
        title : detail.title,
        description : detail.description,
        ProductId : detail.productId,
    })
}

module.exports = {
    addProduct,
    createDescription,
    findProduct,
    updateProductPrice,
}