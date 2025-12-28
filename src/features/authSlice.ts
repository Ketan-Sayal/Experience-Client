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

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login:(state, action:PayloadAction<IUser>)=>{
        state.value = action.payload;
    },
    
    logout:(state)=>{
        state.value = {
           _id:null,
            username:null,
            email:null
        }
    }
  },
})

// Action creators are generated for each case reducer function
export const { login, logout } = authSlice.actions

export default authSlice.reducer