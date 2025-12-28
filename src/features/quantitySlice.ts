import { createSlice } from '@reduxjs/toolkit'


type Quantity = {
    value:number
}

const initialState:Quantity = {
    value: 1
}

export const quantitySlice = createSlice({
  name: 'quantity',
  initialState,
  reducers: {
    increase:(state)=>{
        state.value = state.value+1;
    },
    
    decrease:(state)=>{
       if(state.value>1){
        state.value = state.value-1;
       }
    },
    resetQuantity:(state)=>{
      state.value = 1;
    }
  },
});

// Action creators are generated for each case reducer function
export const { increase, decrease, resetQuantity } = quantitySlice.actions

export default quantitySlice.reducer