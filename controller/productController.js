const { addProduct, findProduct, updateProductPrice} = require('./serviceProduct')
const { findBrand } = require('./serviceBrand')
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

        if(detailList){
            detailList.forEach(detail=> {
                createInfo(detail)
            })
        }

        if(product){
            return res.json({message: 'Product was added!'})
        }
    } catch(err){
        return res.json({message: err.message})
    }
}

async function deleteProduct(req, res, next){
    const { name, price } = req.body

    try{
        const item = await findProduct(name, price)

        await item.destroy()

        return res.json({message : 'Item was deleted!'})
    }catch(err){
        return res.json({message : 'Item does not exist!'})
    }
}

async function updateProduct(req, res, next){
    const { name, oldPrice, newPrice } = req.body

    try{
        await updateProductPrice(name, oldPrice, newPrice) 

        return res.json({message : 'Succesefully updated!'})
    } catch(err){
        return res.json({message : err.message})
    }

}

module.exports = {
    createProduct,
    deleteProduct,
    updateProduct,
}