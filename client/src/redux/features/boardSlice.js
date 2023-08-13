
import { createSlice } from '@reduxjs/toolkit'


export const initialState= {value:[]}

const boardSlice= createSlice({
    name : 'user',
    initialState,
    reducers:{
        setBoards:(state,action)=> {state.value= action.payload}
    }
})

export const {setBoards}= boardSlice.actions

export default boardSlice.reducer