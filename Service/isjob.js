//for job Scheduling service

class jobInfo
{
    constructor(JID,Capacity)
    {
        this.JID=JID;
        this.Capacity=Capacity;
        
    }


}
// Get Jobs
function getJobs(data)
{
                            //jcount
    //var JobInfo=select JID,Capacity  from JShedulw where date='2022/22/3' and shift=1 and M_Id=109 ; return JobInfo

    
    return data;
}

let job1=new jobInfo(1,400)
//console.log(job1)


let job2=new jobInfo(2,500)
//console.log(job2)


let job3=new jobInfo(3,600)
//console.log(job3)


jobs=getJobs(1,2,3)
//console.log(jobs)

for(var i=0;i<jobs.length;i++)
{
    //console.log(jobs[i].Capacity)
}

const TC = require('./TotalCapacityswitch');
//console.log(TC.totalcapacity('3DPrint',1))

//Capacity Remaining  //Available capacity
function capacityRemaining(dataArr,machine_id,shift)
{
    let capacityConsumed=0;
    // let jobs=getJobs(Date,Shift_ID,Machine_ID);

    for(var i=0;i<dataArr.length;i++)
    {
        capacityConsumed+=dataArr[i].job_count;
        
    }
    //   console.log("capacityConsumed from fun=",capacityConsumed)
    //   console.log("Total capacity from function=",TC.totalcapacity(Number(machine_id),Number(shift)))
    return TC.totalcapacity(Number(machine_id),Number(shift))-capacityConsumed;
}

// console.log(capacityRemaining(1,1,1))

module.exports={capacityRemaining,jobInfo,getJobs}
