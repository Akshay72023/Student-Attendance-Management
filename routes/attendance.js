const express = require('express')
const controlAttendance = require('../controllers/attendance')
const router = express.Router()

router.post('/mark-attendance', controlAttendance.postAttendance)
router.get('/get-attendance/:date1', controlAttendance.getAttendance)
router.get('/get-report', controlAttendance.getReport)

module.exports = router;
