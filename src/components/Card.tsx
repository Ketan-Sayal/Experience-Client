
import { useNavigate } from "react-router-dom";
import image from "../assets/test.jpg";
import Button from "./Button";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { setSubTotal } from "../features/subTotalSlice";
import { resetQuantity } from "../features/quantitySlice";
import { setDate } from "../features/dateSlice";
import { setTime } from "../features/timeSlice";
import Delete from "../icons/Delete";
import Update from "../icons/Update";
import { DeleteExperience } from "../utils/react-queries/queries/query-mutations";
import type { AxiosError } from "axios";
import { toast } from "sonner";
import Cookies from "js-cookie";
import { useState } from "react";
import UpdateModal from "./UpdateModal";

interface ICard{
  pic : string;
  price:number;
  place:string;
  description:string;
  title:string;
  _id:string;
  isUpdateOrDelete?:boolean;
}

const Card = ({pic, 
  price, 
  place, 
  description, 
  title, 
  _id, 
  isUpdateOrDelete=false
}:ICard) => {
  const navigate = useNavigate();  
  const dispatch = useAppDispatch();
  const [isUpdate, setIsUpdate]  = useState(false);
  const {mutateAsync:deleteExperience, isPending:isDeleting} = DeleteExperience();
  
  const handleDelete = async()=>{
    try {
      const token = Cookies.get("admin-auth-booklit-token") || '';
      await deleteExperience({id:_id, token});
      toast.success("Experience deleted successfully");
    } catch (error) {
      const err = error as AxiosError;
      const {message} = err.response?.data as any || "Something went wrong";
      toast.error(message);
    }
  }

  return (
    <>
    {isUpdate && <UpdateModal open={isUpdate} setOpen={setIsUpdate} _id={_id}/>}
    <div 
    onClick={()=>{
              dispatch(resetQuantity());
              dispatch(setDate(new Date()));
              dispatch(setTime(""));
              dispatch(setSubTotal(price));
              navigate(`/experience/details/${_id}`);
        }}
    className="w-full xl:w-64 h-[21rem] relative bg-gray-50 rounded-lg">
      <div className="w-full h-[50%]">
        <img src={pic||image} alt="image" className="w-full h-full rounded-t-lg" />
      </div>
      <div className="py-3 px-4 flex flex-col gap-3">
        <div className="flex justify-between items-center">
            <p className="text-lg">{`${title?.length>7?title?.substring(0, 8) + "...":title}`}</p>
            <div className="px-2 py-1 bg-gray-200 rounded-md">
                <p className="text-xs font-semibold">{`${place?.length>12?place?.substring(0, 6)+"...":place}`}</p>
            </div>
        </div>
        <p className="text-gray-500 text-xs w-full">{`${description?.length>88? description?.substring(0, 65) + "...":description}`}</p>
        <div className="pt-2 px-4 w-full absolute left-0 bottom-2 right-0 flex items-center justify-between">
            {!isUpdateOrDelete?<div className="flex items-center pr-8">
                <p className="text-xs pr-1">From</p>
                <h1 className="text-lg">₹{price}</h1>
            </div>:(<div className="flex gap-1">
              <Button 
                onClick={handleDelete}
                onlyYellow={false} 
                padding="p-0" 
                loading={isDeleting}
                loadingText=""
                className="max-w-fit bg-red-400 text-gray-50 hover:border hover:border-red-400 hover:bg-gray-50 hover:text-red-400 duration-200 transition-all" 
                startIcon={<Delete/>}
                />
              <Button 
              onClick={()=>{
                setIsUpdate(true);
              }}
              onlyYellow={false} 
              padding="p-0" 
              className="max-w-fit bg-green-400 text-gray-50 hover:border hover:border-green-400 hover:bg-gray-50 hover:text-green-400 duration-200 transition-all" 
              startIcon={<Update/>}
              />
            </div>)}
            <Button 
            onClick={()=>{
              dispatch(resetQuantity());
              dispatch(setDate(new Date()));
              dispatch(setTime(""));
              dispatch(setSubTotal(price));
              navigate(`/experience/details/${_id}`);
            }}
            text="View Details" className="text-sm max-w-fit block md:hidden xl:block"/>
        </div>
      </div>
    </div>
    </>
  )
}

export default Card
