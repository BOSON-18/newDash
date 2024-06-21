const express=require("express");
const { getData } = require("../controllers/getGenData");
const {fetchLists}= require("../controllers/getDivAndSecList");
const { getDivData } = require("../controllers/getDivData");
const router=express.Router();

router.get("/dashboard",getData)
router.get("/dashboard/getDivisions",fetchLists)
router.get("/dashboard/divSearch",getDivData)


module.exports=router