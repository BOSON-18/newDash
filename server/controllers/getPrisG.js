const Employee = require("../models/Employee");
const { getRange } = require("../utils/getRange");
const { getTimeStamp } = require("../utils/timeStampConversion");


exports.getPrisG=async(req,res)=>{

    try{

        let { lowDate, highDate,divisionName } = req.query.params || req.body;

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
                "category.division": "Computer Division"
              }
            },
            {
              $unwind: "$attendance"
            },
            {
              $match: {
                "attendance.timestamp": {
                  $gte: "23-04-01T00:00:00IST",
                  $lte: "24-03-31T23:59:59IST"
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
          
         // console.log(result);
          res.status(200).json({
            success:true,
            message:"Will You get PrisG???",
            data:result
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