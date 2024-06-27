import { createSlice } from "@reduxjs/toolkit";


const attendanceSlice= createSlice({
    name:"attendance",
    initialState:{
        TotalEmployees:0,
        TotalPresent:0,
        InTimeSwipes:[],
        OutTimeSwipes:[],
        DivisionStats:[],
        divisionList:[],
        sectionList:[{}]
    },
    reducers:{
        setTotalEmployees(state,actions){
            state.TotalEmployees=actions.payload
        },
        setTotalPresent(state,actions){
            state.TotalPresent=actions.payload
        },
        setInTimeSwipes(state,actions){
            state.InTimeSwipes=actions.payload
        },
        setOutTimeSwipes(state,actions){
            state.OutTimeSwipes=actions.payload
        },
        setDivisionStats(state,actions){
            state.DivisionStats=actions.payload
        },
        setDivisionList(state,actions){
            state.divisionList=actions.payload
        },
            setSectionList(state,actions){
            state.sectionList=actions.payload
        }
    }
})

export const{setDivisionStats,setInTimeSwipes,setTotalEmployees,setTotalPresent,setDivisionList,setSectionList,setOutTimeSwipes}= attendanceSlice.actions
export default attendanceSlice.reducer