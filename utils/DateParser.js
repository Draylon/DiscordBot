
class DateParser{
    constructor(){}
    static fromText(text){
        var ms = 0;
        /*
        elemnts to remove:
        and &
        elements to determine date:
        in, within = timer
        @, at <types date> = date, to calculate timer

        elements to separate:
        , " "
        */
        let splitting = text.split(" "),
        spl_ind = 0;

        splitting.forEach(item => {
            switch (item) {
                case 'and':
                case '&':
                    splitting.splice(spl_ind,1);break;
                default:
                break;}
            spl_ind++;
        });
        spl_ind=0;

        let dateType=-1;
        let temp_number = 0;
        let next_p = true;
        splitting.forEach(item => {
            switch (item) {
                case 'in':
                case 'within':
                    if(dateType==-1)dateType=1;
                break;
                // configuring the timer - style
                case 'at':
                case '@':
                    if(dateType==-1)dateType=2;
                break;
                // configuring the date style            
                default:
                    if(dateType == 1){
                        if(parseInt(item) == 'NaN' || parseInt(item) == NaN){
                            console.log(item+" is nan");
                            switch(item){
                                case 'next':
                                    next_p=true;break;
                                case 'milliseconds':
                                case 'millisecond':
                                case 'millisegundos':
                                case 'millisegundo':
                                case 'msecs':
                                case 'msegs':
                                case 'ms':
                                    console.log(temp_number+' ms');
                                    ms+=temp_number;temp_number=0;break;
                                case 'seconds':
                                case 'second':
                                case 'segundos':
                                case 'segundo':
                                case 's':
                                case 'secs':
                                case 'segs':
                                    console.log(temp_number+' secs');
                                    ms+=temp_number*1000;temp_number=0;break;
                                case 'minute':
                                case 'minutes':
                                case 'minutos':
                                case 'minuto':
                                case 'min':
                                case 'm':
                                    console.log(temp_number+' min');
                                    ms+=temp_number*1000*60;temp_number=0;break;
                                case 'hour':
                                case 'hours':
                                case 'horas':
                                case 'h':
                                case 'hrs':
                                    console.log(temp_number+' hrs');
                                    ms+=temp_number*1000*60*60;temp_number=0;break;
                                case 'day':
                                case 'days':
                                case 'd':
                                    ms+=temp_number*1000*60*60*24;temp_number=0;break;
                                case 'week':
                                case 'weeks':
                                case 'w':
                                    if(next_p){ms+=1000*60*60*24*7;temp_number=0;break;}else{
                                        ms+=temp_number*1000*60*60*24*7;temp_number=0;break;}
                                case 'month':
                                case 'months':
                                case 'mt':
                                    if(next_p){ms+=1000*60*60*24*7*4;temp_number=0;break;}else{
                                        ms+=temp_number*1000*60*60*24*7*4;temp_number=0;break;}
                                //=========================================
                                case 'tomorrow':
                                    ms+=1000*60*60*24;temp_number=0;break;
                            }
                        }else{
                            temp_number=parseInt(item);
                        }
                    }else if(dateType == 2){
                        let spl_spot = item.split(':');
                        let hour=0,min=0,seg=0,mss=0,mark='';
                        if(spl_spot.length > 1){//has 2 elements == h:(minute | mark)
                            hour=spl_spot[0];
                            
                            if(spl_spot[1].toLowerCase() == 'am' || spl_spot[1].toLowerCase() =='pm') mark=spl_spot[1];
                            else min = spl_spot[1];

                            
                            if(spl_spot.length > 2)//has 3 elements == h:m:(seconds or mark)
                                if(spl_spot[2].toLowerCase() == 'am' || spl_spot[2].toLowerCase() =='pm') mark=spl_spot[2];
                                else seg = spl_spot[2];
                            
                            if(spl_spot.length > 3)//has 4 elements == h:m:s:ms:mark
                                if(spl_spot[3].toLowerCase() == 'am' || spl_spot[3].toLowerCase() =='pm') mark=spl_spot[3];
                                else mss = spl_spot[3];

                            if(mark == 'pm')
                                ms += ((hour+12)*60*60*1000)+(min*60*60*1000)+(seg*60*1000)+mss;
                            else
                                ms += (hour*60*60*1000)+(min*60*60*1000)+(seg*60*1000)+mss;
                        }else{
                            spl_spot = item.split('/');
                            let d=0,m=0,y=0;
                            if(spl_spot.length > 1){
                                d=spl_spot[0];
                                if(spl_spot.length > 2){
                                    m=spl_spot[1];
                                    y=spl_spot[2];
                                }else{
                                    m=spl_spot[2];
                                    y=2020;
                                }
                                ms+=(d*24*60*60*1000)+(y*365*24*60*60*1000);
                                if(m==2)
                                    ms+=(28*24*60*60*1000);
                                else
                                    if(m%2==0)
                                        ms+=(31*24*60*60*1000);
                                    else
                                        ms+=(30*24*60*60*1000);
                            }else{
                                return -1;
                            }
                        }
                    }else{
                        return -1;
                    }
                break;
            }
            spl_ind++;
        });
        return ms;
    }
}

module.exports = DateParser;