import {dataEndpoints} from "../apis"
import {apiConnector} from "../apiConnector"
const {GET_LIST} = dataEndpoints
import toast from "react-hot-toast"

export const fetchLists=async()=>{
    let result=[];

    try{

        const response = await apiConnector('GET',GET_LIST)

        console.log("List of Category",response);
        
        result = response?.data?.data
        console.log(result)
        if (!response.data.success) {
            throw new Error("Could not fetch range api")
        }

        // Return the response data or handle it as needed

        return result

    }catch(error){
        console.log(error);
        toast.error("Soemthing Went Wrong")

    }
}