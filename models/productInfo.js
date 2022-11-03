
module.exports = (sequelize, DataTypes) => {
    const ProductInfo = sequelize.define("ProductInfo",{
        id:{
            type : DataTypes.UUID,
            defaultValue : DataTypes.UUIDV1,
            primaryKey : true,
            allowNull : false,
            validate : {
                notEmpty : true
            }
        },

        title : {
            type : DataTypes.STRING,
            allowNull : false,
        },

        description : {
            type : DataTypes.STRING,
            allowNull : false,
        },
    })

    ProductInfo.associate = (models) => {
        ProductInfo.belongsTo(models.Product)
    }

    return ProductInfo 
}
