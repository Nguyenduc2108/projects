"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Playlist extends Model {
        /*...*/
    }

    Playlist.init(
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
            modelName: "Playlist",
        }
    );
    return Playlist;
};
