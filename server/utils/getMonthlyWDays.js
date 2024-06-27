exports.getPrisGData = (employees) => {
    const updatedData = new Map();

    employees.forEach((employee) => {
        const CCNO = employee.CCNO;
        const Name = employee.name;
        const TotalDays = employee.TotalWorkingDays;
        const monthAttendance = new Map();
  for (let month = 1; month <= 12; month++) {
            monthAttendance.set(month, 0);
        }
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

        updatedData.set(CCNO, { Name, TotalDays, monthAttendance });
    });

    const dataArray = Array.from(updatedData, ([CCNO, { Name, TotalDays, monthAttendance }]) => {
        return {
            CCNO,
            Name,
            TotalDays,
            monthAttendance: Array.from(monthAttendance, ([month, count]) => ({ month, count }))
        };
    });

    return dataArray;
};
