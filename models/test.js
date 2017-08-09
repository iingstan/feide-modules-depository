module.exports = function (sequelize, DataTypes) {
    var Test = sequelize.define("Test", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        name: DataTypes.STRING,
        age: DataTypes.INTEGER
    }, {
            timestamps: false
        });

    return Test;
};