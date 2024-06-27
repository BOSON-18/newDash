const Employee = require("../models/Employee");
const { getRange } = require("../utils/getRange");
const {getRangeMap}=require("../utils/getRangeMap")

const { getTimeStamp } = require("../utils/timeStampConversion");

exports.getDivData = async (req, res) => {
  try {
   // const { divisionName, sectionName } = req.body;
    let { lowDate, highDate,divisionName, sectionName } = req.query.params || req.body;

    //validation
    console.log("Divisio0n name:->",divisionName,"Section Name->",sectionName)

    if (!lowDate || !highDate || !divisionName) {
      return res.status(400).json({
        success: false,
        message: "Please Provide All required Fields",
      });
    }

    // range from these dates

    console.log("getting Range in Div Search");
    let range = getRange(highDate, lowDate);

    if (range < 1) range = 1;
    console.log("Received Range", range);

    //timestamp Conversion for pipleine purpose
    lowDate = getTimeStamp(lowDate, 0);
    highDate = getTimeStamp(highDate, 1);
    console.log("Prinitng TimeStamped Dates", lowDate, highDate);
    const pipeline =[
        {
            $match: {
              "category.division": divisionName,
              ...(sectionName ? { "category.section": sectionName } : {}),
            // $or: [
            //   {"category.division":divisionName},
            //   { "category.section": sectionName },
            //   { "category.section": { $exists: false } }
            // ]
          }
        },
        {
          $project: {
            attendance: 1,
            category: 1,
            // _id: 1
             name: 1
            
          }
        },
        {
          $unwind: "$attendance"
        },
        {
          $facet: {
            Total: [
              {
                $group: {
                  _id: "$attendance.CCNO"
                }
              },
              {
                $count: "TotalEmployees"
              }
            ],
            TotalPresent: [
              {
                $match: {
                  "attendance.timestamp": {
                    $gte: lowDate,
                    $lte: highDate
                  }
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
            InTimeSwipes: [
              {
                $match: {
                  "attendance.timestamp": {
                    $gte: lowDate,
                    $lte:highDate
                  }
                }
              },
              {
                $project: {
                  _id: 0,
                  "name":1,
                  "attendance.CCNO":1,
                  "attendance.inTime": 1
                }
              }
            ],
            DivisionStats: [
              {
                $match: {
                  "attendance.timestamp": {
                    $gte: lowDate,
                    $lte:highDate
                  },
                 
                }
              },
              {
                $group: {
                  _id: "$category.section",
                  divisionName: {
                    $first: "$category.section"
                  },
                  TotalPresent: { $sum: 1 }
                  // name:{$first:"$name"}
                }
              },
              {
                $project: {
                  _id: 0,
                  divisionName: "$divisionName",
                  TotalPresent: {
                    $divide: ["$TotalPresent", range]
                  }
                }
              },
              {
                $sort: { TotalPresent: -1 }
              }
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
          }
        }
      ]
    const result = await Employee.aggregate(pipeline, { allowDiskUse: true });
    

    console.log("Returning Division Search Data-> ", result);
    const inTimeArr = result[0].InTimeSwipes;
    const outTimeArr= result[0].OutTimeSwipes;
    console.log("Destructiong", inTimeArr);
    let timeRangeMap = getRangeMap(inTimeArr, range);
    console.log("timeRange map", timeRangeMap);
    result[0].InTimeSwipes = timeRangeMap;
    timeRangeMap=getRangeMap(outTimeArr,range);
    result[0].OutTimeSwipes=timeRangeMap;

    return res.status(200).json({
      success: true,
      message: "Successfully received the division Data",
      data: result,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
