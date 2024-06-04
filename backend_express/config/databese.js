const {Sequelize} = require('sequelize');

const sequelize = new Sequelize('library', 'library','zaq1@WSX',{
   host: 'localhost',
   dialect: 'mysql',
   define: {
       timestamp: false
   }
});
module.exports= sequelize;