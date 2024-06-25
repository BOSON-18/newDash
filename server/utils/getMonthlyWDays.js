exports.getPrisGData = (employees) => {
    const updatedData = new Map();

    employees.forEach((employee) => {
        const CCNO = employee.CCNO;
        const monthAttendance = new Map();

        // Process each attendance record of the employee
        for (let i = 0; i < employee?.attendance.length; i++) {
            let [year, month, day] = employee?.attendance[i].split("-");
            month = parseInt(month, 10);

            if (monthAttendance.has(month)) {
                monthAttendance.set(month, monthAttendance.get(month) + 1);
            } else {
                monthAttendance.set(month, 1);
            }
        }

        updatedData.set(CCNO, monthAttendance);
    });

    const dataArray = Array.from(updatedData, ([key, value]) => {
        return {
            CCNO: key,
            monthAttendance: Array.from(value, ([month, count]) => ({ month, count }))
        };
    });

    return dataArray;
};


// function getMonthName(monthNumber) {
//     if (monthNumber < 1 || monthNumber > 12) {
//         return "Invalid month number";
//     }

//     const date = new Date();
//     date.setMonth(monthNumber - 1);

//     return date.toLocaleString('default', { month: 'long' });
// }

// // Example usage:
// console.log(getMonthName(1));  // Output: January
// console.log(getMonthName(5));  // Output: May
// console.log(getMonthName(12)); // Output: December
// console.log(getMonthName(13)); // Output: Invalid month number

