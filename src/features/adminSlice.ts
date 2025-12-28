import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

interface IUser{
        _id:string | null;
        username:string | null;
        email:string | null
}

interface AuthState {
  value: IUser;
}

const initialState:AuthState = {
    value: {
        _id:null,
        username:null,
        email:null
    }
}

export const adminSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    adminLogin:(state, action:PayloadAction<IUser>)=>{
        state.value = action.payload;
    },
    
    adminLogout:(state)=>{
        state.value = {
           _id:null,
            username:null,
            email:null
        }
    }
  },
})

// Action creators are generated for each case reducer function
export const { adminLogin, adminLogout } = adminSlice.actions

export default adminSlice.reducer