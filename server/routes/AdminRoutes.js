const express=require("express");
const { getData } = require("../controllers/getGenData");
const {fetchLists}= require("../controllers/getDivAndSecList");
const { getDivData } = require("../controllers/getDivData");
const { middleware } = require("../middlewares/auth");
const { login } = require("../controllers/Auth");
const router=express.Router();

router.post("/login",login)
router.get("/dashboard/getDivisions",fetchLists,middleware)
router.get("/dashboard",getData,middleware)
router.get("/dashboard/divSearch",getDivData,middleware)


module.exports=router