import LeftArrow from "../../icons/LeftArrow"
import image from "../../assets/test.jpg"
import Button from "../../components/Button"
import BottomBar from "../../components/BottomBar"
import { useNavigate, useParams } from "react-router-dom"
import { GetExperienceById } from "../../utils/react-queries/queries/query-mutations"
import ExperiencePageSkeleton from "../../components/ExperiencePageSkeleton"
import { useAppSelector } from "../../hooks/useRootState"
import { useAppDispatch } from "../../hooks/useAppDispatch"
import { decrease, increase } from "../../features/quantitySlice"
import { setSubTotal } from "../../features/subTotalSlice"
import { setDate } from "../../features/dateSlice"
import { setTime } from "../../features/timeSlice"
import { setExperience } from "../../features/experienceSlice"
import { useEffect } from "react"


const ExperiencePage = () => {
  const {id} = useParams();
//   console.log(id);
  const {data:experienceData, isLoading} = GetExperienceById(id || '');
  const navigate = useNavigate();
  
  const quantity = useAppSelector((state)=>state.quantity);
  const dispatch = useAppDispatch();
  const subtotal = useAppSelector((state)=>state.subTotal);
  const date = useAppSelector((state)=>state.date);
  const time = useAppSelector((state)=>state.time);
  
  const setDateFn = (date:Date)=>{dispatch(setDate(date))};
  const setTimeFn = (time:string)=>{dispatch(setTime(time))};
  
  useEffect(()=>{
    dispatch(setSubTotal(experienceData?.experience?.price));
  }, [isLoading]);

  if(isLoading){
    return <ExperiencePageSkeleton/>
  }
  console.log(experienceData?.experience);
  

  return (
    <div className="px-24 py-4">
      <div className="flex items-center gap-2">
        <LeftArrow 
        onClick={()=>{
          setDateFn(new Date());
          setTimeFn("");
          navigate("/");
        }}
        />
        <p className="font-semibold text-xs">Details</p>
      </div>
        <div className="flex gap-7 pt-4 w-full">
            <div className="w-[109%] h-[300px]">
                <img src={experienceData?.experience?.pic || image} alt="place-pic"  className="w-full h-full rounded-lg"/>
            </div>
            <div className="bg-gray-50 p-4 w-[50%] flex flex-col gap-1 rounded-lg max-h-fit">
                <div className="flex justify-between items-center">
                    <p className="text-xs text-gray-810">Starts at</p>
                    <p className="text-xs">₹{experienceData?.experience?.price || 999}</p>
                </div>

                <div className="flex justify-between items-center">
                    <p className="text-xs text-gray-810">Quantity</p>
                    <div className="text-xs text-gray-810 flex gap-1 items-center">
                         <div 
                         onClick={()=>{
                          if(date.value && time.value){
                          dispatch(increase());
                          const subT = (quantity.value+1)*parseInt(experienceData?.experience?.price);
                          dispatch(setSubTotal(subT));
                        }}}
                         className="text-gray-810 p-2 cursor-pointer">
                            +
                         </div>
                         {quantity.value}
                         <div 
                         onClick={()=>{
                          if(quantity.value>1 && date.value && time.value){
                            dispatch(decrease());
                            const subT = (quantity.value-1)*parseInt(experienceData?.experience?.price);
                            dispatch(setSubTotal(subT));
                          }
                        }}
                         className="text-gray-810 p-2 cursor-pointer">
                            -
                         </div>
                    </div>
                </div>
                
                <div className="flex justify-between items-center">
                    <p className="text-xs text-gray-810">Subtotal</p>
                    <p className="text-xs text-gray-810">₹{subtotal.value>parseInt(experienceData?.experience?.price)?subtotal.value:experienceData?.experience?.price}</p>
                </div>
                
                <div className="flex justify-between items-center pt-2">
                    <p className="text-xs text-gray-810">Taxes</p>
                    <p className="text-xs text-gray-810">₹59</p>
                </div>
                <hr className="text-gray-810 font-bold"/>
                <div className="flex justify-between py-3 items-center">
                    <p className="text-base font-semibold">Total</p>
                    <p className="text-base font-semibold">₹{subtotal.value>parseInt(experienceData?.experience?.price)?subtotal.value+59:parseInt(experienceData?.experience?.price)+59}</p>
                </div>
                <Button 
                onClick={()=>{
                  navigate(`/checkout/${experienceData?.experience?._id}`);
                  dispatch(setExperience(experienceData?.experience));
                }}
                text="Confirm" disabled={!(time.value && date.value)}/>
            </div>
        </div>
        <BottomBar experience={ (experienceData === undefined || experienceData?.experience===undefined)?{}: experienceData?.experience} date={date.value} time={time.value} setDate={setDateFn} setTime={setTimeFn}/>
    </div>
  )
}

export default ExperiencePage
