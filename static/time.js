export const getNowDate =()=>{
    const date = new Date()
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()

    let newMonth = ''

    switch(month){
        case 1:
            newMonth = "January";
            break;
        case 2:
            newMonth = "February";
            break;
        case 3:
            newMonth = "March";
            break;
        case 4:
            newMonth = "April";
            break;
        case 5:
            newMonth = "May";
            break;
        case 6:
            newMonth = "June";
            break;
        case 7:
            newMonth = "July";
            break;
        case 8:
            newMonth = "August";
            break;
        case 9:
            newMonth = "September";
            break;
        case 10:
            newMonth = "October";
            break;
        case 11:
            newMonth = "November";
            break;
        case 12:
            newMonth = "December";
            break;
    }

    return [newMonth,day].join(" ")

}