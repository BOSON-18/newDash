
const Users = require("../models/Users");
const bcrypt=require("bcryptjs")
const dotenv=require("dotenv")
dotenv.config()
const jwt= require("jsonwebtoken")
exports.login = async (req, res) => {
  try {
    const { loginId, password } = req.body;
    console.log("Checking Id password from req", loginId, password);

    //validation
    if (!loginId || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const user = await Users.findOne({  loginId });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid User",
      });
    }

    // comparing password with the password in database --> using bcrypt js for this

    const matchingPassword= await bcrypt.compare(password,user.password);

    if(!matchingPassword){
        return res.status(401).json({
            success:false,
            message:"Invalid Password"
        })
    }
    user.password=undefined; // for extra security

    // now creating jwt token fot the session

    const token= await jwt.sign({loginId},process.env.JWT_SECRET,{expiresIn:3600})//clumsy->jwtSecret expiresIn->1 hr

    user.token=token;

    res.status(200).json({
        success:true,
        message:"Successfully Logged In",
        token,
        user
    })
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};


// exports.logout=async(req,res)=>{

//   try{




//   }catch(error){

//     console.log(error);
//     return res.status(500).json({
//       success:false,
//       message:"Inernal Server Error"
//     })
//   }
// }
