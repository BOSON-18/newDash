const express=require("express");
const { getData } = require("../controllers/getGenData");
const router=express.Router();

router.get("/dashboard",getData)


module.exports=router