function getMonthName(monthNumber) {
  if (monthNumber < 1 || monthNumber > 12) {
      return "Invalid month number";
  }

  const date = new Date();
  date.setMonth(monthNumber - 1);

  return date.toLocaleString('default', { month: 'long' });
}

// Example usage:
console.log(getMonthName(1));  // Output: January
console.log(getMonthName(5));  // Output: May
console.log(getMonthName(12)); // Output: December
console.log(getMonthName(13)); // Output: Invalid month number