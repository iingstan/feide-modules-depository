module.exports = function (sequelize, DataTypes) {
    var Module = sequelize.define("Module", {
        name: {
            type: DataTypes.STRING
        },
        version: {
            type: DataTypes.STRING
        },
        username: {
            type: DataTypes.STRING
        },
        intro: {
            type: DataTypes.STRING
        }
    }, {
            timestamps: false
        });

    return Module;
};