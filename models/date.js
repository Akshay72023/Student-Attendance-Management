const Sequelize = require('sequelize')
const sequelize = require('../util/database')

const DateModel = sequelize.define('date',{
    id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        primaryKey:true,
        autoIncrement:true,
        
    },
    
    date:{
        type:Sequelize.DATE,    
        allowNull:false,
        unique:true
    }
});

module.exports = DateModel