import React, { useEffect, useRef } from 'react'
import Button from './Button'
import Input from './Input'
import Cross from '../icons/Cross'
import { UpdateExperience } from '../utils/react-queries/queries/query-mutations';
import { useForm } from 'react-hook-form';
import Cookies from 'js-cookie';
import { toast } from 'sonner';
import type { AxiosError } from 'axios';

interface IUpdateModal{
    open:boolean;
    setOpen:React.Dispatch<React.SetStateAction<boolean>>;
    _id:string
}

interface Input{
  title:string;
  description:string;
  price:number;
  place:string;
  timings:string;
  offerCode?:string;
  offerPercent?:number;
  date:string;
  pic:File[];
}

type OptionalInput = Partial<Input>;


const UpdateModal = ({setOpen, open, _id}:IUpdateModal) => {
    const modalRef = useRef<HTMLDivElement>(null);
    const {mutateAsync:updateExperience, isPending} = UpdateExperience();
    const {register, handleSubmit} = useForm<OptionalInput>({
      defaultValues:{
        title:"",
        description:'',
        price:-1,
        place:"",
        timings:"",
        offerCode:"",
        offerPercent:0,
        date:"",
        pic:undefined
      }
    })


    const handleClickOutside = (e:MouseEvent) => {
      if (e.target instanceof Node && modalRef.current && !modalRef.current.contains(e.target)) {
        setOpen(false);
      }
    };


    useEffect(()=>{
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [open, setOpen]);

    const onSubmit = async(data:OptionalInput)=>{
      try {
        let pic = null;
        if(data.pic && data?.pic[0]){
            pic = data.pic[0];
        }
        const token = Cookies.get("admin-auth-booklit-token") || '';
        const offerCode = data.offerCode || '';
        const offerPercent = data.offerPercent || 0;
        await updateExperience({pic, token, bookingData:data.timings || '', description:data.description || '', offerCode, place:data.place || '', date:data.date || '', price:data.price || -1, title:data.title || '', offerPercent, _id});
        setOpen(false);
        toast.success("Experience updated successfully");
      } catch (error) {
       const err = error as AxiosError;
       const {message} = err.response?.data as any || {message:"Something went wrong"};
       toast.error(message);
      }
      
    }

  return (
    <div 
      className="fixed inset-0 rounded-md top-0 left-0 w-screen h-screen flex p-6 lg:p-0 lg:justify-center lg:items-center bg-black/50 z-10">
            <div 
            ref={modalRef}
            className="bg-white w-[90vw] md:w-[95vw] lg:w-1/2 min-h-96 rounded-md max-h-[90vh] relative">
              <div className="absolute top-3 right-3">
                  <Button onlyYellow={false}
                   onClick={()=>setOpen(false)}
                   className="hover:bg-gray-300 min-w-fit"
                   curve="rounded-full"
                   padding="p-0"
                   endIcon={<Cross/>}/>
              </div>
              <div className="max-h-[90vh] overflow-y-auto rounded-md thin-scrollbar w-full">
                <form onSubmit={handleSubmit(onSubmit)} className="w-full px-5 py-4 flex flex-col gap-3">
                <h1 className="text-center text-lg text-gray-810">Update Experience</h1>
                <div className="flex flex-col gap-2">
                  <h1 className="text-gray-810">Title</h1>
                  <Input 
                  {...register("title")}
                  placeholder="My Experience" className="text-gray-810"/>
                  
                </div>
                <div className="flex flex-col gap-2">
                  <h1 className="text-gray-810">Description</h1>
                  <Input 
                  {...register("description")}
                  placeholder="It will be a good experience" className="text-gray-810"/>
                </div>
                <div className="flex flex-col gap-2">
                  <h1 className="text-gray-810">Price</h1>
                  <Input 
                  {...register("price")}
                  placeholder="0" type="number" className="text-gray-810"/>
                </div>
                <div className="flex flex-col gap-2">
                  <h1 className="text-gray-810">Place</h1>
                  <Input 
                  {...register("place")}
                  placeholder="Chandigarh" className="text-gray-810"/>
                </div>
                <div className="flex flex-col gap-2">
                  <h1 className="text-gray-810">Add Timings</h1>
                  <Input 
                  {...register("timings")}
                  placeholder="7AM 8:30PM" className="text-gray-810"/>
                </div>
                <div className="flex flex-col gap-2">
                  <h1 className="text-gray-810">Add Offer Code</h1>
                  <Input 
                  {...register("offerCode")}
                  placeholder="DIVE30" className="text-gray-810"/>
                </div>
                <div className="flex flex-col gap-2">
                  <h1 className="text-gray-810">Add Offer Percent</h1>
                  <Input 
                  {...register("offerPercent")}
                  placeholder="0" type="number" className="text-gray-810"/>
                </div>
                <div className="flex flex-col gap-2">
                  <h1 className="text-gray-810">Date</h1>
                  <Input 
                  {...register("date")}
                  placeholder="" type="date" className="text-gray-810"/>
                </div>
                <div className="flex flex-col gap-2">
                  <h1 className="text-gray-810">Pic</h1>
                  <Input 
                  {...register("pic")}
                  placeholder="" type="file" className="text-gray-810"/>
                </div>
                <Button 
                loading={isPending}
                text="Create" type="submit"/>
              </form>
              </div>
            </div>
        </div>
  )
}

export default UpdateModal;
