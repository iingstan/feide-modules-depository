module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define("User", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        username: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        password: DataTypes.STRING,
        authorization: DataTypes.STRING
    }, {
            timestamps: false
        });

    return User;
};