const Sequelize = require('sequelize')
const sequelize = require('../util/database')

const AttendanceModel = sequelize.define('attendance',{
    id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        primaryKey:true,
        autoIncrement:true,
        
    },
    name:{
        type:Sequelize.STRING,
        allowNull:false

    },
    status:{
        type:Sequelize.STRING,
        allowNull:false
    },
    dateId: {
        type: Sequelize.INTEGER, 
        allowNull: false,
    }
    
})


module.exports = AttendanceModel