const brand = require('../models/brand')
const { addItem, findItem, updatePrice, searchBy, createBrand } = require('./service')

async function addPost(req, res, next){
    const {name, price, brand} = req.body

    try{
        const item = await addItem(name, price, brand)

        if(item){
            return res.json({message : 'Item was added!'})
        }
    } catch(err){
        return res.json({message : 'Error'})
    }
}

async function deletePost(req, res, next){
    const { name, price } = req.body

    try{
        const item = await findItem(name, price)

        await item.destroy()

        return res.json({message : 'Item was deleted!'})
    }catch(err){
        return res.json({message : 'Item does not exist!'})
    }
}

async function updatePost(req, res, next){
    const { name, oldPrice, newPrice } = req.body

    try{
        await updatePrice(name, oldPrice, newPrice) 

        return res.json({message : 'Succesefully updated!'})
    } catch(err){
        return res.json({message : err.message})
    }

}

async function searchPost(req,res,next){
    const { minPrice, maxPrice } = req.body

    try {
        const products = await searchBy(minPrice, maxPrice) 

        return res.json(products)
    } catch (err) {
        return res.json({message : err.message})
    }
}

async function addbrandPost(req,res,next){
    const { brandName } = req.body

    try {
        
        const brand = await createBrand(brandName)

        if(brand){
            return res.json({message : "Brand was created succesfully!"})
        }

        return res.json("Error")
    } catch (err) {
       return res.json({message : err.message}) 
    }
}

module.exports = {
   addPost,
   deletePost,
   updatePost,
   searchPost,
   addbrandPost
}