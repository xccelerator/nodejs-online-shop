const { addItem, findItem, updatePrice } = require('./service')

async function addPost(req, res, next){
    const {name, price} = req.body

    try{
        const item = await addItem(name, price)

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

module.exports = {
   addPost,
   deletePost,
   updatePost
}