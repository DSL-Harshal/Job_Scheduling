/////
const HolidayModel=require('../models/holiday.model')
const JobInfoModel=require('../models/jobs.model')
const isValidDate=require('../Service/isDatevalid')

const isjob=require('../Service/isjob')

//get HoliInfo list
exports.holidaylist=(req,res)=>{
       HolidayModel.getAllHoliday(req.query.date,(err,holiinfo)=>{
        //console.log("Holiday",req.query.date)
        if(err)
        res.send(err);
        res.send(holiinfo.rows)
        
        
    });
    
}

//validate the date as holiday or not
exports.hoiliDateList=(req,res)=>{
    HolidayModel.getHolidayByDate((err,holiinfo)=>{
        if(err)
        res.send(err)
        //console.log(holiinfo.rows)
        
        MyHoliDay=[]
        for(var i=0;i<holiinfo.rows.length;i++)
        {
          var  date = holiinfo.rows[i]["date"];
          //console.log("date Controller",date)
          MyHoliDay.push(date)
        }
        res.send(isValidDate.isDateValid(req.query.date,MyHoliDay))
        
        
    })
}


//get All jobs
exports.joblist=(req,res)=>{
    JobInfoModel.getAllJobs((err,jobinfo)=>{
     if(err)
     res.send(err);
     res.send(jobinfo.rows)
     
     
 });
 
}
//get job by jobcount
exports.jobCountList=(req,res)=>{
    const jobReqData=new JobInfoModel(req.body)
    //  console.log("jobreqData123 jobcount=",jobReqData.job_count)
    JobInfoModel.getAllJobsByJobCount(jobReqData,(err,jobinfo)=>{
        
     if(err)
     res.send(err);
     res.send(jobinfo.rows)
     
     //jobs by count
     jobByCount=[]

     for(var i=0;i<jobinfo.rows.length;i++)
     {
         jobByCount.push(jobinfo.rows[i])
     }
     console.log("JOBCOUNT=",jobReqData.machine_id,jobReqData.shift)
    Available_Capacity=isjob.capacityRemaining(jobByCount,jobReqData.machine_id,jobReqData.shift)
    console.log("Available=",Available_Capacity)
    //check available capacity

    
        if(Available_Capacity>jobReqData.job_count)
        {
            console.log("Data Insert Sucessfully!!!");
            this.createnewjob(req,res)
        }
        else
        {
            return new Error("Capacity Exceeded : " + "Available=" + Available_Capacity+" request= "+jobinfo.Capacity) 
        }
        


     
     
 });
 
}

//create  new job
exports.createnewjob=(req,res)=>{
    const jobReqData=new JobInfoModel(req.body)
    // console.log("jobreqData=",jobReqData)
    //if object = null

    if(req.body.constructor==Object && Object.keys(req.body.length)===0)
    {
        res.send(400).send({success:false,message:"Please fill all fild"});
    }
    else
    {
        //console.log("Valid Data")
        JobInfoModel.createJob(jobReqData,(err,jobinfo)=>{
            if(err)
            res.send(err);
            res.json({status:true,message:"New Job Created Successfully",data:jobinfo})
        })
    }
}

//get total Capacity

exports.totalCapacity=(req,res)=>{
    JobInfoModel.getTotalCapacity(req,(err,jobinfo)=>{
     if(err)
     res.send(err);
     res.send(jobinfo.rows)
     console.log(jobinfo.rows)
     
 });
 
}







