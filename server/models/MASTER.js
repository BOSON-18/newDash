
const mongoose=require("mongoose");

const masterSchema= mongoose.Schema({
    CCNO:{
        type:Number,
        required:true
    },
    E_NAME:String,
    E_DIVN_NAME:String,
    E_SECN_NAME:String,
    DATE_OF_SWIPE:String,
    TIME_OF_SWIPE:String,
    READER_TYPE:String
})

module.exports=mongoose.model("Master",masterSchema);