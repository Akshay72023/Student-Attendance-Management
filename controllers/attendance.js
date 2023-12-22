const sequelize = require("../util/database");
const AttendanceModel = require('../models/attendance')
const DateModel = require('../models/date')

exports.getAttendance = (req, res, next) => {
  const date1 = req.params.date1;
  const date = new Date(date1)
  DateModel.findOne({where: {date: date}})
  .then(dateModel => {
      //console.log(dateModel);
      if (dateModel) {
          const dateId = dateModel.id;
          console.log(dateId);
          AttendanceModel.findAll({
              where: {
                  dateId: dateId
              }
        })
            .then(result => {
                console.log('In get controller');
                  res.json(result);
              })
              .catch(err => console.log(err));
          } else {
              console.log('Date not found');
              res.json();
          }
      })
      .catch(err => {
        console.log(err)
        res.json()
      })
}

exports.postAttendance = (req, res, next) => {
  console.log('in post controller');
  const name = req.body.name;
  const status = req.body.status;
  const date1 = req.body.date1;
  
  const date = new Date(date1);

  
  DateModel.findOrCreate({
    where: { date: date },
    defaults: { date: date } 
  })
  .then(([dateModel, created]) => {
    const dateId = dateModel.id;
    return AttendanceModel.create({
      name: name,
      status: status,
      dateId: dateId 
    });
  })
  .then(result => {
    //console.log(result);
    console.log('Created attendance');
    res.json(result);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({ error: 'Server error' });
  });
}


exports.getReport = (req, res, next) => {
  
  AttendanceModel.findAll({
    attributes: [
      'name',
      [sequelize.fn('SUM', sequelize.literal("CASE WHEN status = 'present' THEN 1 ELSE 0 END")), 'present_count'],
      [sequelize.fn('SUM', sequelize.literal("CASE WHEN status = 'absent' THEN 1 ELSE 0 END")), 'absent_count'],
    ],
    group: ['name'],
  })
  .then(results => {
    //console.log(results);
    res.json(results);
  })
  .catch(err => {
    console.error(err);
  });
  
}