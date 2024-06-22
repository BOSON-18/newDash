const mongoose=require("mongoose")

const attendanceSchema=new mongoose.Schema({
    CCNO:Number,
    date:String,
    inTime:String,
    outTime:String,
    swipes:[
        {
            time:String,
            status:String
        }
    ],
    timestamp:String
})


module.exports=mongoose.model("Attendance",attendanceSchema);