const express=require("express");
const app=express();
const {connectDB}=require("./config/mongo")
const AdminRoutes=require("./routes/AdminRoutes")
const cors=require("cors")
connectDB()
app.use(express.json());


app.use(
    cors({
        origin:"http://localhost:5173",
        credentials:true
    })
)
app.use(AdminRoutes)
app.listen(4000,'0.0.0.0',()=>console.log('Server running at 4000'))

