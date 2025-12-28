import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

type IDate = {
    value:Date
}

const initialState:IDate = {
    value: new Date("2003"),
}

export const dateSlice = createSlice({
  name: 'date',
  initialState,
  reducers: {
    setDate:(state, actions:PayloadAction<Date>)=>{
        state.value = actions.payload;
    },
  },
})

// Action creators are generated for each case reducer function
export const { setDate } = dateSlice.actions

export default dateSlice.reducer