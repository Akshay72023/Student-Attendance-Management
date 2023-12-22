const express = require('express')
const sequelize = require('./util/database')
const cors = require('cors')
const bodyParser = require('body-parser')
const Student = require('./models/attendance')
const DateModel = require('./models/date')
const app = express()

app.use(bodyParser.json())
app.use(cors())
const routeAttendance = require('./routes/attendance')
app.use(routeAttendance)

//Student.belongsTo(DateModel, { constraints: true, onDelete: 'CASCADE' });
DateModel.hasMany(Student, { constraints: true, onDelete: 'CASCADE' });
sequelize
//.sync({ force: true })
.sync()
.then(()=>{
    app.listen(5000)
    console.log('listening to port 5000')
})
.catch(err=>console.log(err))