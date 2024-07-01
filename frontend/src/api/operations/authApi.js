import {authEndPoints} from "../apis"
import { apiConnector } from "../apiConnector"
import { setLoading,setToken } from "../../store/slices/auth"
import toast from "react-hot-toast"


export const login=async(loginId,password,navigate,dispatch)=>{

    console.log(loginId,password)

    const {LOGIN_API} = authEndPoints

    dispatch(setLoading(true))

    try{

        console.log("calling login api")
        const response =await apiConnector("POST",LOGIN_API,{loginId,password})

       console.log(response)

       dispatch(setToken(response?.data?.token))
       localStorage.setItem("token",response?.data?.token)

       toast.success("Login Success")

      navigate("/dashboard")

    }catch(error){
        console.log("Loign API error...",error);
        toast.error("Something Went Wrong")
    }

    dispatch(setLoading(false))

}