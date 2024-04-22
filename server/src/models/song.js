"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Song extends Model {
        static associate(models) {
            // define association here
        }
    }
    Song.init(
        {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            name: DataTypes.STRING(50),
            artist: DataTypes.STRING(100),
            image: DataTypes.STRING(255),
            lyric: DataTypes.STRING(255),
        },
        {
            sequelize,
            modelName: "Song",
        }
    );
    return Song;
};
