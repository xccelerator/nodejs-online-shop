const { addProduct, findProduct, updateProductPrice, createDescription } = require('./serviceProduct')
const { findBrand } = require('./serviceBrand')

const { Product} = require('../models')
const path = require('path')
const uuid = require('uuid')

async function createProduct(req, res, next){
    try{
        const { name, price, brandName, detailList } = req.body
        //const { img } = req.files

        //let fileName = uuid.v4() + ".jpg"
        //img.mv(path.resolve(__dirname, "..", "static", fileName))

        let brandId = await findBrand(brandName)
        brandId = brandId[0].dataValues.id

        const product = await addProduct(name, price, brandId)
        const productId = product.dataValues.id

        if(detailList){
            detailList.forEach(detail=> {
                createDescription(detail, productId)
            })
        }

        if(product){
            return res.json({message: 'Product was added!'})
        }

        return res.json({message: 'Error'})
    } catch(err){
        return res.json({message: err.message})
    }
}

async function deleteProduct(req, res, next){
    const { name } = req.body

    try{
        const product = await findProduct(name)

        await product[0].destroy()

        return res.json({message : 'Item was deleted!'})
    }catch(err){
        return res.json({message : 'Item does not exist!'})
    }
}

async function updateProduct(req, res, next){
    const { name, newPrice } = req.body

    try{
        await updateProductPrice(name, newPrice) 

        return res.json({message: 'Succesefully updated!'})
    } catch(err){
        return res.json({message: err.message})
    }

}

async function getAll(req, res, next){
    try{
        const products = await Product.findAll()

        return res.json({products})
    }catch(err){
        return res.json({message: err.message})
    }
}

module.exports = {
    createProduct,
    deleteProduct,
    updateProduct,
    getAll, 
}