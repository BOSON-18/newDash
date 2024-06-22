// for checking some parameters before finally making the req to the server
// Basically AUTHORIZING req 

const jwt = require("jsonwebtoken")

exports.middleware=async(req,res)=>{

    try{

        // What check we need to let the req to access the server ????
        //--->>>> Its Token that we created in Auth.js controller while login 
        const token=req.body;
        
        if(!token){
            return res.status(401).json({
                success:false,
                message:"Token is missing"
            })
        }

        try{
            //decoding the token
            const token = jwt.verify(token,"clumsy");

            //decode success

            req.user=decode;
        }
        catch(error){
            console.error(error);
            return res.status(401).json({
                success:false,
                message:"Invalid Token",
                error:error.message
            })
        }

    }catch(error){
        console.error(error);
        return res.status(401).json({
            success:false,
            message:"Internal Server Error",
            error:error.message
        })
    }
}