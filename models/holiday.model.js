var dbConn=require('../config/db.config');
const isValidDate=require('../Service/isDatevalid')
// var HoliInfo=(holiinfo)=>{
//     this.holioday_id=holiinfo.holioday_id;
//     this.holiday_name=holiinfo.holiday_name;
//     this.date=holiinfo.date;
//     }



// //get all Holiday from db

// HoliInfo.getAllHoliday=(date,result)=>{
//     // var sql='';
    
//     // if(date){
//     //     sql+=" where date= ?";
//     // }
//     dbConn.query("SELECT * FROM job_scheduling.holiday_master",/*+sql,[date]*/ function (err,res) {
//         if (err) throw err;
//         result(null,res);
//       });
//     }

async function getHolidayByDate(jobReqData){
  var sql = "SELECT date FROM job_scheduling.holiday_master"
  const results = await dbConn.query(sql)
  var MyHoliday=[]
        for(var i=0;i<results.rows.length;i++)
        {
          var  date = results.rows[i]["date"];
          MyHoliday.push(date)
        }
        a=isValidDate.isDateValid(jobReqData,MyHoliday)
        console.log("aa=",a)
        return a;
}

// function getHolidayByDate(req,res){
//     var MyHoliday=[]
//     dbConn.query("SELECT date FROM job_scheduling.holiday_master",function (err,res) {
//         if (err) throw err;
//         for(var i=0;i<res.rows.length;i++)
//         {
//           var  date = res.rows[i]["date"];
//           MyHoliday.push(date)
//         }
//         // console.log("Hello",MyHoliday)
//         // return MyHoliday
        
        
//       });
//       console.log("Hello",MyHoliday)

      

//     }
    
  
    module.exports = { getHolidayByDate }
    








 




    
// module.exports=HoliInfo;

