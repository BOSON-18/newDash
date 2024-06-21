const Employee = require("../models/Employee");
const { getRange } = require("../utils/getRange");

const { getTimeStamp } = require("../utils/timeStampConversion");

exports.getDivData = async (req, res) => {
  try {
    const { divisionName, sectionName } = req.body;
    let { lowDate, highDate } = req.query.params || req.body;

    //validation
    console.log("Divisio0n name:->",divisionName)

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
            "category.division": {
              $eq: divisionName
            }
          }
        },
        {
          $project: {
            attendance: 1,
            category: 1,
            // _id: 1
            // name: 1
            
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
                    $gte: "24-01-24T00:00:00IST",
                    $lte: "24-01-25T23:59:59IST"
                  }
                }
              },
              {
                $project: {
                  _id: 0,
                  "attendance.inTime": 1
                }
              }
            ],
            DivisionStats: [
              {
                $match: {
                  "attendance.timestamp": {
                    $gte: "24-01-24T00:00:00IST",
                    $lte: "24-01-25T23:59:59IST"
                  }
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
            ]
          }
        }
      ]
    const result = await Employee.aggregate(pipeline);
    

    console.log("Returning Division Search Data-> ", result);

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
