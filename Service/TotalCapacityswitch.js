//for job Scheduling service
function totalcapacity(mid,shift)
{
    
    
    switch(mid)
    {
        case 1: 
                        if(shift==1)
                        {
                            return 4000;
                        }   
                        else if(shift==2)
                        {
                            
                            return 3000;
                        }
                break;
        case 2:
                            if(shift==1)
                            {
                                return 2000;
                            }   
                            else if(shift==2)
                            {
                                return 2000;
                            }
                    break;
        case 3:
                                if(shift==1)
                                {
                                    return 20000;
                                }   
                                else if(shift==2)
                                {
                                    return 25000;
                                }
        break;


        case 4:
                                if(shift==1)
                                {
                                    return 3000;
                                }   
                                else if(shift==2)
                                {
                                    return 2500;
                                }
        break;

        case 5:
                                if(shift==1)
                                {
                                    return 6000;
                                }   
                                else if(shift==2)
                                {
                                    return 4000;
                                }
        break;

        default:
            return -1;

    }
}

//console.log(totalcapacity('3DPrint',1))
module.exports = { totalcapacity }