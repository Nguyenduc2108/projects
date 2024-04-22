"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Singer extends Model {
        /*...*/
    }

    Singer.init(
        {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            name: DataTypes.STRING(50),
        },
        {
            sequelize,
            modelName: "Singer",
        }
    );
    return Singer;
};
