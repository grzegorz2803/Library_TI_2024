const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('library', 'library', 'zaq1@WSX', {
    host: 'localhost',
    dialect: 'mysql',
    define: {
        timestamps: false
    }
});

module.exports = sequelize;