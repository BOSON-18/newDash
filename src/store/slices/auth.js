import { createSlice } from "@reduxjs/toolkit";



const authSlice= createSlice({
    name:"auth",
    initialState:{
        user:null,
        token:localStorage.getItem("token")?(localStorage.getItem("token")):(null),
        loading:false,
        searchType:"single"
        
    },
    reducers:{
        setToken(state,actions){
            state.token=actions.payload
        },
        setLoading(state,actions){
            state.loading=actions.payload
        },
        setUser(state,actions){
            state.user=actions.payload
        },
        setSearchType(state,actions){
            state.searchType=actions.payload;
        }
    }
})

export const {setLoading,setToken,setUser,setSearchType}=authSlice.actions;
export default authSlice.reducer