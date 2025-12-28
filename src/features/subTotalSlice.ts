import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

type SubTotal = {
    value:number
}

const initialState:SubTotal = {
    value: 1
}

export const subTotalSlice = createSlice({
  name: 'quantity',
  initialState,
  reducers: {
    setSubTotal:(state, actions:PayloadAction<number>)=>{
        state.value = actions.payload;
    },
  },
})

// Action creators are generated for each case reducer function
export const { setSubTotal } = subTotalSlice.actions

export default subTotalSlice.reducer