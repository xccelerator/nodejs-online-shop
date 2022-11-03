const { createBrand, findBrand, updateBrandName} = require('./serviceBrand')
const { Brand } = require('../models')

async function addBrand(req, res, next){
    const {name} = req.body

    try{
        const brand = await createBrand(name)

        if(brand){
            return res.json({message : 'Item was added!'})
        }
    } catch(err){
        return res.json({message : err.message})
    }
}

async function deleteBrand(req, res, next){
    const { name } = req.body

    try{
        const brand = await findBrand(name)

        await brand[0].destroy()

        return res.json({message : 'Item was deleted!'})
    }catch(err){
        return res.json({message : 'Item does not exist!'})
    }
}

async function updateBrand(req, res, next){
    const { oldName, newName } = req.body

    try{
        await updateBrandName(oldName, newName) 

        return res.json({message : 'Succesefully updated!'})
    } catch(err){
        return res.json({message : err.message})
    }

}

async function getAllBrands(req, res, next){
    try{
        const allBrands = await Brand.findAll()

        return res.json({allBrands})
    }catch(err){
        return res.json({message : err.message})
    }
}

module.exports = {
   addBrand,
   deleteBrand,
   updateBrand,
   getAllBrands,
}