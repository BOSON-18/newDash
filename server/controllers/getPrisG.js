const Employee = require("../models/Employee");
const {  getPrisGData } = require("../utils/getMonthlyWDays");
const { getRange } = require("../utils/getRange");
const { getTimeStamp } = require("../utils/timeStampConversion");


exports.getPrisG=async(req,res)=>{

    try{

        let { lowDate, highDate,divisionName } = req.query.params || req.body;
        console.log("Pris Info->",lowDate, highDate,divisionName )

        if (!lowDate || !highDate || !divisionName) {
            return res.status(400).json({
              success: false,
              message: "Please Provide All required Fields",
            });
          }

          
    console.log("getting Range in Div Search");
    let range = getRange(highDate, lowDate);

    if (range < 1) range = 1;
    console.log("Received Range", range);

    //timestamp Conversion for pipleine purpose
    lowDate = getTimeStamp(lowDate, 0);
    highDate = getTimeStamp(highDate, 1);
    console.log("Prinitng TimeStamped Dates", lowDate, highDate);

        const pipeline=[
            {
              $match: {
                "category.division": divisionName
              }
            },
            {
              $unwind: "$attendance"
            },
            {
              $match: {
                "attendance.timestamp": {
                  $gte: lowDate,
                  $lte:highDate
                }
              }
            },
            {
              $group: {
                _id: "$CCNO",
                CCNO:{$first:"$CCNO"},
                name: { $first: "$name" },
                attendance: {
                  $push: "$attendance.timestamp"
                },
                TotalWorkingDays:{
                  $sum:1
                }
              },
              
            },
            {
              $sort: { _id: 1 }
            }
           
          ]
          const result = await Employee.aggregate(pipeline, { allowDiskUse: true });
          
          // console.log(result[1]);

          const employees=result;

          const updatedData=getPrisGData(employees);
          console.log("Updated DATA",updatedData)
          res.status(200).json({
            success:true,
            message:"Will You get PrisG???",
            data:updatedData
          })

    }
    catch(error){

        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Internal Server Error",
            error:error.message
        })
    }
}