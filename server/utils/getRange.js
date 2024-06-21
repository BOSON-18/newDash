exports.getRange = (highDate, lowDate) => {
  let dateParts1 = highDate.split("-");
  console.log("Date1",dateParts1)
  let date1 = new Date("20" + dateParts1[0], dateParts1[1] - 1, dateParts1[2]);

  let dateParts2 = lowDate.split("-");
  console.log("Date2",dateParts2)
  let date2 = new Date("20" + dateParts2[0], dateParts2[1] - 1, dateParts2[2]);

  // Calculate the difference in milliseconds
  let difference = date1.getTime() - date2.getTime();
  console.log("Difference",difference)

  // Convert the difference from milliseconds to days
  let numDays = Math.floor(difference / (1000 * 60 * 60 * 24)); //(ms * sec*min*hr)
  if (dateParts1[2] % 4 == 0 || dateParts1[2] % 4 == 0) numDays++;
  console.log("range of given dates", numDays);
  
  return numDays>1?numDays+1:numDays
};
