export function dateValidation(row: any, inDate: number, errorThrow = true) {
  const date = new Date(inDate);
  if(Object.prototype.toString.call(date) === '[object Date]' && !isNaN(date.getTime())) return true
  return false;
}
const is = (interval:number, cycle:number) =>
  cycle >= interval ? Math.floor(cycle / interval) : 0;

export function ago(time:number, now:number = Date.now()) {

  const secs = (now - time) / 1000;
  const mins = is(60, secs);
  const hours = is(60, mins);
  const days = is(24, hours);
  const weeks = is(7, days);
  const months = is(30, days);
  const years = is(12, months);

  let amt = years;
  let cycle = 'year';

  if (secs <= 1) {
      return 'just now';
  } else if (years > 0) {
      amt = years;
      cycle = 'year';
  } else if (months > 0) {
      amt = months;
      cycle = 'month';
  } else if (weeks > 0) {
      amt = weeks;
      cycle = 'week';
  } else if (days > 0) {
      amt = days;
      cycle = 'day';
  } else if (hours > 0) {
      amt = hours;
      cycle = 'hour';
  } else if (mins > 0) {
      amt = mins;
      cycle = 'minute';
  } else if (secs > 0) {
      amt = secs;
      cycle = 'second';
  }

  const v = Math.floor(amt);

  return `${v === 1 ? (amt === hours ? 'an' : 'a') : v} ${cycle}${v > 1 ? 's' : ''} ago`;
}