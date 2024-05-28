// Display the current time in London:
const currentTimeInLondon = moment().tz('Europe/London').format('HH:mm:ss');
console.log(`The current time in London is: ${currentTimeInLondon}`);
