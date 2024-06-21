const express=require("express");
const app=express();
const {connectDB}=require("./config/mongo")
const AdminRoutes=require("./routes/AdminRoutes")
connectDB()
app.use(express.json());
app.use(AdminRoutes)
app.listen(4000,()=>console.log('Server running at 4000'))

