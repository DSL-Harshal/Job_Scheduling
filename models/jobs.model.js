var dbConn = require('../config/db.config');

//job info model
//jobname,status,schedule_date,latest_schedule_date,
//reschedule_reason,machine_id,shift_capacity_id
var JobInfo = function (jobinfo) {
  this.jobid = jobinfo.jobid;
  this.jobname = jobinfo.jobname;
  this.job_count = jobinfo.job_count;
  this.status = jobinfo.status;
  this.schedule_date = jobinfo.schedule_date;
  this.latest_schedule_date = jobinfo.latest_schedule_date;
  this.reschedule_reason = jobinfo.reschedule_reason;
  this.machine_id = jobinfo.machine_id;
  this.shift = jobinfo.shift;
}

//get all jobs
JobInfo.getAllJobs = (result) => {
  var sql = "select jobid,jobname,machine_name,status,job_count,j.shift,schedule_date,latest_schedule_date,reschedule_reason from job_scheduling.job_master as j,job_scheduling.machine_master as m where j.machine_id=m.machine_id order by jobid;"
  dbConn.query(sql, function (err, res) {
    if (err) throw err;
    result(null, res);
  })
}




//create new job
JobInfo.createJob = (jobReqData, result) => {
  const { jobname, status, job_count, schedule_date, latest_schedule_date, reschedule_reason, machine_id, shift } = jobReqData
  
  var sql = `INSERT INTO job_scheduling.job_master(jobname,status,job_count,schedule_date,latest_schedule_date,reschedule_reason,machine_id,shift) VALUES ('${jobname}','${status}','${job_count}','${schedule_date}','${latest_schedule_date}','${reschedule_reason}','${machine_id}','${shift}')`;

  dbConn.query(sql, (err, res) => {
    if (err) {
      console.log("Error while inserting data")
      result(null, err);
    }
    else {
      console.log("New Job Created Sucessfully")
      // console.log("New Job=",res)
      result(null, res)
    }
  })
}

//get job Id by capacity/jobcount
JobInfo.getAllJobsByJobCount = (jobReqData, result) => {

  const { jobname, status, job_count, schedule_date, latest_schedule_date, reschedule_reason, machine_id, shift } = jobReqData
  console.log("Scheduling Date",schedule_date);
  var sql = "SELECT jobid,job_count,machine_id,shift FROM job_scheduling.job_master where machine_id=" + machine_id + "and shift=" + shift + "and schedule_date=$1::text";
  dbConn.query(sql, [schedule_date], function (err, res) {
    if (err) throw err;
    result(null, res);
    console.log("res=", res.rows)
  })
}


//get total Capacity
JobInfo.getTotalCapacity = (req, result) => {
  machine_id = req.query.machine_id;
  shift = req.query.shift;

  var sql = "SELECT capacity FROM job_scheduling.shift_capacity_master where machine_id=" + machine_id + "and shift=" + shift + "";
  dbConn.query(sql, function (err, res) {
    if (err) throw err;
    result(null, res);
  })
}


module.exports = JobInfo;








