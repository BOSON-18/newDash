const mongoose=require("mongoose")

exports.connectDB=async()=>{
    try{
        mongoose.connect("mongodb+srv://deeshankbatra663:Cleverfox18@cluster0.bkfjew1.mongodb.net/RRCAT",{
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

