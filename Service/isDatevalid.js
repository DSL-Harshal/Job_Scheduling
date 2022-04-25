//Date Validation

function isDateValid(date,myHolidays)
{
    const holiDayOfWeek=4;
    var today = new Date(date);

    //console.log(today.getDay());
    if(today.getDay()==holiDayOfWeek)
    {
        return false;
    }
    //console.log("DDD",myHolidays)
    //myHolidays=['2022-01-01','2022-01-14','2022-01-26','2022-01-31','2022-02-14','2022-02-19'];
    //console.log("Date=",date,"Myholiday=",myHolidays)
    for(var i=0;i<myHolidays.length;i++)
    {
        
        if(date==myHolidays[i])
        {
            
            return false;
        }
    }
    return true;
}


//console.log(isDateValid('2022-01-28'))
module.exports={isDateValid}