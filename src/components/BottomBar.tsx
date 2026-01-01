import { useState } from "react"
import ToggleButton from "./ToggleButton"
import Button from "./Button";

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

interface IBottomBar{
  date: Date;
  setDate: (date:Date)=>void;
  time: string;
  setTime:(time:string)=>void;
  experience?: IExperience | null;
}

const BottomBar = ({ date, setDate, time, setTime, experience=null }: IBottomBar) => {
  const [dateI, setDateI] = useState<number>(-1);
  return (
    <div className="pt-4 flex flex-col gap-3 w-full md:w-[65%]">
      <h1 className="text-lg">{(experience && experience?.title) || ''}</h1>
      <p className="text-gray-810 md:text-pretty text-justify text-wrap overflow-hidden">
        {(experience && experience?.description) || "Lorem ipsum dolor sit amet consectetur adipisicing elit."}
      </p>

      {/* Conditional Rendering for Bookings */}
      {experience && experience?.bookingsData?.length > 0 ? (
        <>
          {/* Date Section */}
          <div className="pt-2 flex flex-col gap-3">
            <h2 className="font-semibold text-black">Choose Date</h2>
            <div className="flex gap-2 items-center">
              {experience?.bookingsData?.map((data, i:number)=>new Date(new Date().setHours(0, 0, 0, 0)).getTime()<=new Date(data.date).getTime()?<ToggleButton key={i} text={`${new Date(data?.date)?.toLocaleString("en-US", {month:"short"})} ${new Date(data?.date)?.getDate()}, ${new Date(data.date).getFullYear()}`} onClick={() => {
              setDate(new Date(data?.date));
              setDateI(i);
              setTime("");
            }} value={`${new Date(date).toLocaleDateString("en-US", {month:"short"})} ${new Date(date)?.getDate()}`} />:<Button className="max-w-fit" text={`${new Date(data?.date)?.toLocaleString("en-US", {month:"short"})} ${new Date(data?.date)?.getDate()}`} disabled={true}/>)}           
            </div>
          </div>
          
        </>
      ) : (
        <div className="flex flex-col gap-3">
          <p className="font-semibold text-black">Bookings</p>
          <div className="px-3 py-1 w-fit rounded-md bg-gray-700">
            <p>No Bookings available</p>
          </div>
        </div>
      )}
      {dateI!==-1 && <div className="pt-2 flex flex-col gap-3">
            <h2 className="font-semibold text-black">Choose Time</h2>
            <div className="flex gap-2 items-center">
              {experience?.bookingsData[dateI]?.timings.map((timeF)=><ToggleButton  key={timeF} text={timeF} onClick={() => setTime(timeF)} value={time} />)}
              
            </div>
          </div>}
      {experience && experience?.bookingsData?.length>0 && <p className="text-gray-810 text-xs">All times are in IST (GMT +530)</p>}
     
      <div className="flex flex-col gap-3">
        <p className="font-semibold text-black">Destination</p>
        <div className="px-3 py-1 w-fit rounded-md bg-gray-700">
          <p>{(experience && experience?.place) || 'Hell'}</p>
        </div>
      </div>
    </div>
  )
}

export default BottomBar
