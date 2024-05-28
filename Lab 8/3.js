// Given two dates, display the date closest to the current date:

const date1 = moment('2024-05-01');
const date2 = moment('2024-05-15');
const currentDate = moment();

const diff1 = Math.abs(currentDate.diff(date1));
const diff2 = Math.abs(currentDate.diff(date2));

const closestDate = diff1 < diff2 ? date1 : date2;
console.log(`The date closest to the current date is: ${closestDate.format('YYYY-MM-DD')}`);
