//Display the number of years, months, and days between your birthdate and the current date:

const birthdate = moment('1983-05-08');
const currentDate = moment();
const duration = moment.duration(currentDate.diff(birthdate));
const years = duration.years();
const months = duration.months();
const days = duration.days();
console.log(`${years} years, ${months} months, and ${days} days`);
