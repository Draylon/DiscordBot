

module.exports = DateParser => {
    DateParser.fromText(text);
    let ms = 0;
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
    automata_row = [],
    spl_ind = 0;

    splitting.forEach(item => {
        switch (item) {
            case 'and':
            case '&':
                splitting.splice(spl_ind,1);break;
            default:
                automata_row.push(parseInt(item));
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
                if(automata_row[spl_ind] == NaN){
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
                            ms+=temp_number;temp_number=0;break;
                        case 'seconds':
                        case 'second':
                        case 'segundos':
                        case 'segundo':
                        case 's':
                        case 'secs':
                        case 'segs':
                            ms+=temp_number*1000;temp_number=0;break;
                        case 'minute':
                        case 'minutes':
                        case 'minutos':
                        case 'minuto':
                        case 'min':
                        case 'm':
                            ms+=temp_number*1000*60;temp_number=0;break;
                        case 'hour':
                        case 'hours':
                        case 'horas':
                        case 'h':
                        case 'hrs':
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
                    temp_number=item;
                }
            break;
        }
        spl_ind++;
    });
};

