const mongoose= require("mongoose");

const employeeSchema=mongoose.Schema({
    CCNO:Number,
    Name:String,
    Category:{
        division:String,
        section:String
    },
    Attendance:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Attendance"
        }
    ]
})

module.exports=mongoose.model("Employee",employeeSchema)