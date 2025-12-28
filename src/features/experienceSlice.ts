import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

interface IBookingSlot {
  _id?: string;
  date: Date; 
  timings: string[];
}

interface IBookedSlot {
  _id?: string;
  date: string;
  timings: string[];
  user: string; 
}

interface IOfferCode {
  _id?: string;
  code: string;
  offerPercent: number;
}

interface IExperience {
  _id: string;
  adminId: string; 
  title: string;
  description: string;
  place: string;
  price: number;
  bookingsData: IBookingSlot[];
  offerCodesData: IOfferCode[];
  alreadyBooked: IBookedSlot[];
  pic: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

interface IIntialState{
    value:IExperience | null
}

const initialState:IIntialState = {
    value: null
}

export const experienceSlice = createSlice({
  name: 'experince',
  initialState,
  reducers: {
    setExperience:(state, actions:PayloadAction<IExperience>)=>{
        state.value = actions.payload;
    },
  },
})

// Action creators are generated for each case reducer function
export const { setExperience } = experienceSlice.actions;

export default experienceSlice.reducer;