module.exports = (sequelize, DataTypes) => {
    const Brand = sequelize.define("Brand", {
        id:{
            type : DataTypes.UUID,
            defaultValue : DataTypes.UUIDV1,
            primaryKey : true,
            allowNull : false,
            validate : {
                notEmpty : true
            }
        },

        name : {
            type : DataTypes.STRING,
            unique : true
        }
    })


    Brand.associate = (models) => {
        Brand.hasMany(models.Product)
    }

    return Brand
}
