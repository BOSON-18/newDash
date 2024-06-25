const Employee = require("../models/Employee")

exports.fetchLists=async(req,res)=>{

    try{

        const pipeline=[
            {
                $group:{
                    _id:"$category.division",
                    division:{$first:"$category.division"},
                    section:{
                        $addToSet:"$category.section"
                    },
                    
                      
                    
                },
                
            },
            {
                $project:{
                    _id:0,
                    division:1,
                    section:1
                }
            },
        ]

        const result=await Employee.aggregate(pipeline, { allowDiskUse: true });

        console.log("Prinitng List result: ",result)

        return res.status(200).json({
            success:true,
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