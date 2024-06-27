import React from 'react'
import { useSelector } from 'react-redux'

const Table = () => {

  const {DivisionStats}= useSelector((state)=>state.attendance)
  console.log("Table Data-->" , DivisionStats)

  const monthNames = [
    'April', 'May', 'June', 'July', 'August', 'September',
    'October', 'November', 'December', 'January', 'February', 'March'
  ];
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border-collapse border border-gray-200 shadow-md rounded-lg">
        <thead>
          <tr className="bg-gray-100 border-b border-gray-200">
            <th className="text-left py-2 px-3 sticky top-0 bg-gray-200 border-gray-300 border">CCNO</th>
            <th className="text-left py-2 px-3 sticky top-0 bg-gray-200 border-gray-300 border">Name</th>
            {monthNames.map((monthName) => (
              <th key={monthName} className="text-left py-2 px-3 sticky top-0 bg-gray-200 border-gray-300 border">
                {monthName}
              </th>
            ))}
            <th className="text-left py-2 px-3 sticky top-0 bg-gray-200 border-gray-300 border">Total Working Days</th>
          </tr>
        </thead>
        <tbody>
          {DivisionStats.map(({ CCNO, Name, monthAttendance, TotalDays }) => (
            <tr key={CCNO} className="border-b border-gray-200 hover:bg-gray-100">
              <td className="py-2 px-3 border-l border-gray-300">{CCNO}</td>
              <td className="py-2 px-3 border-l border-gray-300">{Name}</td>
              

{[3, 4, 5, 6, 7, 8, 9, 10, 11, 0, 1, 2]?.map((month) => (
              <td key={month} className="py-2 px-3 border-l border-gray-300">
              {monthAttendance && monthAttendance[month] ? monthAttendance[month].count : 0}
              </td>
            ))}
              <td className="py-2 px-3 border-l border-gray-300">{TotalDays}</td>
            </tr>
          ))}
        </tbody>
        {/* <tfoot>
          <tr className="bg-gray-100 border-t border-gray-200">
            <td colSpan="2" className="py-2 px-3 border-l border-gray-300">Total</td>
            {Array.from({ length: 12 }, (_, index) => index + 1).map((month) => (
              <td key={month} className="py-2 px-3 border-l border-gray-300">
                {DivisionStats.reduce((acc, curr) => acc + (curr.monthAttendance.find((item) => item.month === month)?.count || 0), 0)}
              </td>
            ))}
            <td className="py-2 px-3 border-l border-gray-300">
              {DivisionStats.reduce((acc, curr) => acc + curr.TotalDays, 0)}
            </td>
          </tr>
        </tfoot> */}
        </table>
        </div>
  )
     
}

export default Table