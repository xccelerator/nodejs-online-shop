module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define("Product",{
        id:{
            type : DataTypes.UUID,
            defaultValue : DataTypes.UUIDV1,
            primaryKey : true,
            allowNull : false,
            validate : {
                notEmpty : true
            }
        },
        price : {
            type : DataTypes.INTEGER,
            allowNull : true,
        },
        name : {
            type : DataTypes.STRING,
            allowNull : false,
            validate : {
                notEmpty : true
            }
        },

        img : {
            type : DataTypes.STRING,
            allowNull : false,
        },
    })

    Product.associate = (models) => {
        Product.belongsTo(models.Brand)
    }

    Product.associate = (models) => {
        Product.hasMany(models.ProductInfo, {
            as : 'info'
        })
    }
    return Product
}
