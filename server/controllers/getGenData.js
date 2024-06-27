const Employee = require("../models/Employee");
const { getRange } = require("../utils/getRange");
const { getRangeMap } = require("../utils/getRangeMap");
const { getTimeStamp } = require("../utils/timeStampConversion");

exports.getData = async (req, res) => {
  try {
    let { lowDate, highDate } = req.query.params || req.body;

    console.log("LowDate", lowDate, "highDate", highDate);

    if (!lowDate || !highDate) {
      return res.status(400).json({
        success: false,
        message: "Please Provide All required Fields",
      });
    }
    //range

    console.log("getting Range");
    let range = getRange(highDate, lowDate);

    if (range < 1) range = 1;
    // else if(range==1) range=2

    console.log("Received Range", range);

    // Time Stamp Conversion

    lowDate = getTimeStamp(lowDate, 0);
    highDate = getTimeStamp(highDate, 1);
    console.log("Prinitng TimeStamped DAtes", lowDate, highDate);

    //pipeline
    const pipeline = [
      {
        $facet: {
          Total: [
            {
              $count: "TotalEmployees",
            },
          ],
          TotalPresent: [
            {
              $unwind: "$attendance"
            },
            {
              $match: {
                $and: [
                  {
                    "attendance.timestamp": {
                      $lte:  highDate
                    }
                  },
                  {
                    "attendance.timestamp": {
                      $gte:  lowDate
                    }
                  }
                ]
              }
            },
            {
              $group: {
                _id: "$attendance.date",
                totalOnDay: {
                  $sum: 1
                }
              }
            },
            {
              $group: {
                _id: null,
                totalOfPresent: {
                  $sum: "$totalOnDay"
                },
                totalDates: {
                  $sum: 1
                }
              }
            },
            {
              $project: {
                _id: 0,
                TotalPresent: {
                  $divide: [
                    "$totalOfPresent",
                  //   "$totalDates"
                  range
                  ]
                },
                Range: range,
                totalSwipesIn: "$totalOfPresent"
              }
            }
          ],
          DivisionStats: [
            {
              $unwind: "$attendance",
            },
            {
              $match: {
                $and: [
                  {
                    "attendance.timestamp": {
                      $gte: lowDate,
                    },
                  },
                  {
                    "attendance.timestamp": {
                      $lte: highDate,
                    },
                  },
                ],
              },
            },
            {
              $group: {
                _id: "$category.division",
                divisionName: {
                  $first: "$category.division",
                },
                TotalPresent: {
                  $sum: 1,
                },
              },
            },
            {
              $project: {
                _id: 0,
                divisionName: "$divisionName",
                TotalPresent: {
                  $divide: ["$TotalPresent", range],
                },
              },
            },
            {
              $sort: { TotalPresent: -1 },
            },
          ],

          InTimeSwipes: [
            { $unwind: "$attendance" },
            {
              $match: {
                $and: [
                  {
                    "attendance.timestamp": {
                      $gte: lowDate,
                    },
                  },
                  {
                    "attendance.timestamp": {
                      $lte: highDate,
                    },
                  },
                ],
              },
            },
            {
              $project: {
                _id: 0,
                "attendance.CCNO":1,
                "attendance.inTime": 1,
                "name":1
              },
            },
          ],
          OutTimeSwipes: [
            { $unwind: "$attendance" },
            {
              $match: {
                $and: [
                  {
                    "attendance.timestamp": {
                      $gte: lowDate,
                    },
                  },
                  {
                    "attendance.timestamp": {
                      $lte: highDate,
                    },
                  },
                ],
              },
            },
            {
              $project: {
                _id: 0,
                "attendance.CCNO":1,
                "attendance.outTime": 1,
                "name":1
              },
            },
          ],
        },
      },
    ];

    const result = await Employee.aggregate(pipeline, { allowDiskUse: true });

    console.log("Printing result: ", result);
    const inTimeArr = result[0].InTimeSwipes;
    const outTimeArr= result[0].OutTimeSwipes;
    console.log("Destructiong", inTimeArr);
    let timeRangeMap = getRangeMap(inTimeArr, range);
    console.log("timeRange map", timeRangeMap);
    result[0].InTimeSwipes = timeRangeMap;
    timeRangeMap=getRangeMap(outTimeArr,range);
    console.log("OutSwipes",timeRangeMap)
    result[0].OutTimeSwipes=timeRangeMap;

    res.status(200).json({
      success: true,
      message: "Successfully get the data of the provided dates",
      data: result,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "internal Server Error",
      error: error.message,
    });
  }
};
