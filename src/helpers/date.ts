export function dateValidation(row: any, inDate: number, errorThrow = true) {
    const date = new Date(inDate);
    if(Object.prototype.toString.call(date) === '[object Date]' && !isNaN(date.getTime())) return true
    return false;
}
