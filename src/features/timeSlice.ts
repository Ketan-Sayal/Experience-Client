import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

type SubTotal = {
    value:string
}

const initialState:SubTotal = {
    value: ""
}

export const timeSlice = createSlice({
  name: 'time',
  initialState,
  reducers: {
    setTime:(state, actions:PayloadAction<string>)=>{
        state.value = actions.payload;
    },
  },
})

// Action creators are generated for each case reducer function
export const { setTime } = timeSlice.actions

export default timeSlice.reducer