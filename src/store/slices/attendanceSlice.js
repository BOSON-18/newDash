import { createSlice } from "@reduxjs/toolkit";


const attendanceSlice= createSlice({
    name:"attendance",
    initialState:{
        TotalEmployees:0,
        TotalPresent:0,
        InTimeSwipes:[],
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

export const{setDivisionStats,setInTimeSwipes,setTotalEmployees,setTotalPresent,setDivisionList,setSectionList}= attendanceSlice.actions
export default attendanceSlice.reducer