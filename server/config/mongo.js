const mongoose=require("mongoose")
const dotenv=require("dotenv")
dotenv.config()

exports.connectDB=async()=>{
    try{
        mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser:true,
            useUnifiedTopology:true
        })
        .then((console.log('DB connected Successfully')))
        .catch((error)=>console.log(error))

    }catch(error){
        console.log("DB connection Failed")
        console.log(error)
        process.exit(1);
    }
}

