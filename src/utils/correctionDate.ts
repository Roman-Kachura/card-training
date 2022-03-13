export const correctionDate = (date:string) => {
    let newDate = date.split('T');
    let day = newDate[0].split('-').reverse().join('-');
    let time = newDate[1].substring(0,8);
    return `${day} ${time}`;
}