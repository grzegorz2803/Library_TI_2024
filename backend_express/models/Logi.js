
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Logi = sequelize.define('Logi', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    id_user: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    operation: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    login_date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    logout_date: {
        type: DataTypes.DATE,
        allowNull: true
    }
}, {
    tableName: 'Logi'
});

module.exports = Logi;
