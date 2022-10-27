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
        cost : {
            type : DataTypes.INTEGER,
            allowNull : true,
        },
        denumire : {
            type : DataTypes.STRING,
            allowNull : false,
            validate : {
                notEmpty : true
            }
        },

        brandName : {
            type : DataTypes.STRING,
        }
    })

    Product.associate = (models) => {
        Product.belongsTo(models.Brand, {
            foreignKey: 'brandId',
            targetKey : 'brandName'
        });
    }

    return Product
}
