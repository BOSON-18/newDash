const mongoose= require("mongoose");

const employeeSchema=new mongoose.Schema({
    CCNO:Number,
    Name:String,
    Category:{
        division:String,
        section:String
    },
    Attendance:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"attendance"
        }
    ]
})

module.exports=mongoose.model("Employee",employeeSchema)