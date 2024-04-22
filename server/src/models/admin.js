"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Admin extends Model {
        static associate(models) {
            // define association here
        }
    }
    Admin.init(
        {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            name: DataTypes.STRING(50),
            email: DataTypes.STRING(100),
            password: DataTypes.STRING(100),
        },
        {
            sequelize,
            modelName: "Admin",
        }
    );
    return Admin;
};
