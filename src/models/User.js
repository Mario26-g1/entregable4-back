const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');
const bcrypt = require('bcrypt')

const User = sequelize.define('user', {
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    country: {
        type: DataTypes.STRING,
        allowNull: false
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false
    },
    isVerified: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: false
    },
});
User.prototype.toJSON = function () {
    const values = { ...this.get() };
    delete values.password;
    return values;
};

User.beforeCreate(async (user) => {
    hashPassword = await bcrypt.hash(user.password, 10)
    user.password = hashPassword
});

module.exports = User;