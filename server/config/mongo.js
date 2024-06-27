const mongoose=require("mongoose")

exports.connectDB=async()=>{
    try{
        mongoose.connect("mongodb://10.10.18.21:27017/?directConnection=true&serverSelectionTimeoutMS=10000&appName=mongosh+2.2.6/test",{
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

