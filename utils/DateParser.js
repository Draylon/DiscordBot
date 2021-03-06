
const server_delay = (date) => {
    return (1000*60*60*(date.getUTCHours()-date.getHours())+
    1000*60*(date.getUTCMinutes()-date.getMinutes())+
    1000*(date.getUTCSeconds()-date.getSeconds())+
    (date.getUTCMilliseconds()-date.getMilliseconds()))
};

module.exports = (text,now,utc_delay) => {
    if(!utc_delay)
        utc_delay=-3;
    var ms = 0;
    let done=false;
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
    //console.log(splitting);

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
    //console.log(splitting);
    let dateType=-1;
    let temp_number = 0;
    let next_p = true;
    splitting.forEach(item => {
        item = item.trim();
        switch (item) {
            case 'in':
            case 'em':
            case 'within':
                if(dateType==-1)dateType=1;
            break;
            // configuring the timer - style
            case 'at':
            case '@':
            case 'when':
            case 'date':
            case 'time':
                if(dateType==-1)dateType=2;
            break;
            // configuring the date style            
            default:
                if(dateType == 1 && !done){
                    if(isNaN(parseInt(item))){
                        switch(item){
                            case 'next':
                                next_p=true;break;
                            case 'seconds':
                            case 'second':
                            case 'segundos':
                            case 'segundo':
                            case 's':
                            case 'secs':
                            case 'segs':
                                //console.log(temp_number+' secs');
                                ms+=temp_number*1000;temp_number=0;break;
                            case 'minute':
                            case 'minutes':
                            case 'minutos':
                            case 'minuto':
                            case 'min':
                            case 'm':
                                //console.log(temp_number+' min');
                                ms+=temp_number*1000*60;temp_number=0;break;
                            case 'hour':
                            case 'hours':
                            case 'horas':
                            case 'h':
                            case 'hrs':
                                //console.log(temp_number+' hrs');
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
                }else if(dateType == 2 && !done){
                    splitting.splice(spl_ind-1,1);
                    item = splitting.join(" ").trim();
                    let today_ = new Date(now);
                    let sv_delay=server_delay(today_);
                    let date_str=[today_.getUTCDate(),today_.getUTCMonth(),today_.getUTCFullYear()],
                    time_str=[today_.getUTCHours(),today_.getUTCMinutes()+5,today_.getUTCSeconds()],
                    mark='',spl_spot = item.split(" ");
                    if(spl_spot.length > 0 && item.length > 0 && !done){
                        const user_var_date=spl_spot[0].split("/");
                        const user_var_time=spl_spot[0].split(":");
                        if(user_var_date.length > 1){
                            var user_var = user_var_date;
                            let uc=0;
                            while(uc < date_str.length && uc < user_var.length){
                                date_str[uc] = parseInt(user_var[uc]);
                                uc++;}
                            if(spl_spot.length > 1){ // has time
                                user_var=spl_spot[1].split(":");
                                uc=0;
                                while(uc < time.length && uc < user_var.length){
                                    time_str[uc] = parseInt(user_var[uc]);
                                    if(uc==0) time_str[uc]-=utc_delay;
                                    uc++;}
                                if(spl_spot.length > 2) // has set am-pm
                                    mark=spl_spot[2].toLowerCase();
                                    if(mark == 'pm' && time_str[0] < 12)
                                        time_str[0]+=12;
                            }
                        }else if(user_var_time.length > 1){
                            var user_var = user_var_time;
                            let uc=0;
                            while(uc < time_str.length && uc < user_var.length){
                                time_str[uc] = parseInt(user_var[uc]);
                                if(uc==0) time_str[uc]-=utc_delay;
                                uc++;}
                            if(spl_spot.length > 1){ // has date
                                user_var=spl_spot[1].split("/");
                                if(user_var.length > 1){
                                    uc=0;
                                    while(uc < date_str.length && uc < user_var.length){
                                        date_str[uc] = parseInt(user_var[uc]);
                                        uc++;}
                                    if(spl_spot.length > 2) // has set am-pm
                                        mark=spl_spot[2].toLowerCase();
                                        if(mark == 'pm' && time_str[0] < 12)
                                            time_str[0]+=12;
                                }else{
                                    mark=spl_spot[1].toLowerCase();
                                    if(mark == 'pm' && time_str[0] < 12)
                                        time_str[0]+=12;
                                    if(spl_spot.length > 2){
                                        user_var=spl_spot[2].split("/");
                                        if(user_var.length > 1){
                                            uc=0;
                                            while(uc < date_str.length && uc < user_var.length){
                                                date_str[uc] = parseInt(user_var[uc]);
                                                uc++;}
                                        }
                                    }
                                }
                            }
                        }
                    }
                    ms = (Date.UTC(date_str[2],date_str[1],date_str[0],time_str[0],time_str[1],time_str[2],0));
                    done=true;
                }else{
                    return -1;
                }
            break;
        }
        spl_ind++;
    });
    if(dateType == 1)
        ms+=now;
    return ms;
};