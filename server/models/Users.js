const mongoose=require("mongoose");

const userSchema=mongoose.Schema({
    loginId:{
        type:String,
        required:true,
        trim:true
    },
    password:{
        typr:String,
        requiredtrue
    }
})

module.exports= mongoose.model("User",userSchema)