const express = require('express');

const router = express.Router();

const JobsController = require('../controller/jobs.controller')

//get all JobInfo   http://localhost:3000/jobs/

//router.get('/',JobsController.holidaylist);


//get all holidays
router.get('/holidays', JobsController.holidaylist);

//get all dates with validations
router.get('/holidays/Date', JobsController.hoiliDateList);

//get all jobs
router.get('/getjobs', JobsController.joblist);

//get all jobs by jobcount
router.post('/getjobsbyjobcount', JobsController.jobCountList);//http://localhost:3000/Jobs/getjobsbyjobcount?machine_id=5

//create new jobs
router.post('/addnewjob', JobsController.createnewjob);

//total capacity
router.get('/totalcapacity', JobsController.totalCapacity);


module.exports = router;