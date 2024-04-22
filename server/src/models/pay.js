"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Pay extends Model {
        /*...*/
    }

    Pay.init(
        {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            name: DataTypes.STRING(50),
            email: DataTypes.STRING(100),
        },
        {
            sequelize,
            modelName: "Pay",
        }
    );
    return Pay;
};
