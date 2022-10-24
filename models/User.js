module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("User",{
        id:{
            type : DataTypes.UUID,
            defaultValue : DataTypes.UUIDV1,
            primaryKey: true,
            allowNUll : false,
            validate : {
                notEmpty : true
            }
        },
        username: {
            type: DataTypes.STRING,
            allowNull : false,
            unique: true,
            validate: {
                notEmpty: true
            }
        },

        password: {
            type: DataTypes.STRING,
            allowNull : false,
            validate: {
                notEmpty: true
            }
        }
    })

    return User;
}