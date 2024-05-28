// Calculate the number of days between your birthdate and the current date:


const birthdate = moment('1983-05-08');
const currentDate = moment();
const daysDifference = currentDate.diff(birthdate, 'days');
console.log(`Number of days between birthdate and current date: ${daysDifference}`);
