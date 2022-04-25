//insert


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
    JobInfoModel.getAllJobsByJobCount(req.query.machine_id,(err,jobinfo)=>{
        const jobReqData=new JobInfoModel(req.body) 
     if(err)
     res.send(err);
     res.send(jobinfo.rows)
     //jobs by count
     jobByCount=[]

     for(var i=0;i<jobinfo.rows.length;i++)
     {
         jobByCount.push(jobinfo.rows[i])
     }
    Available_Capacity=isjob.capacityRemaining(jobByCount)
    console.log("Available=",Available_Capacity)
    //check available capacity

    for(var i=0;i<jobByCount.length;i++)
    {
        if(Available_Capacity>jobByCount[i].job_count)
        {
                console.log("Valid Data")
                JobInfoModel.createJob(jobReqData,(err,jobinfo)=>{
                    if(err)
                    res.send(err);
                    res.json({status:true,message:"New Job Created Successfully",data:jobinfo})
                })
        }
        else
        {
            return new Error("Capacity Exceeded : " + "Available=" + availableCapacity+" request= "+jobinfo.Capacity) 
        }
        }


     
     
 });
 
}

//create  new job
exports.createnewjob=(req,res)=>{
    const jobReqData=new JobInfoModel(req.body)
    //console.log("jobreqData=",jobReqData)
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







