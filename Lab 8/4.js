// Given two dates, display whether the first date is before or after the second date:
const date1 = moment('2024-05-01');
const date2 = moment('2024-05-15');

if (date1.isBefore(date2)) {
    console.log('The first date is before the second date.');
} else if (date1.isAfter(date2)) {
    console.log('The first date is after the second date.');
} else {
    console.log('Both dates are the same.');
}
