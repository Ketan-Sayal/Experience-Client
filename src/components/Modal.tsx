import React, { useEffect, useRef } from 'react'
import Button from './Button'
import Input from './Input'
import Cross from '../icons/Cross'
import { CreateExperience } from '../utils/react-queries/queries/query-mutations';
import { useForm } from 'react-hook-form';
import Cookies from 'js-cookie';
import { toast } from 'sonner';
import type { AxiosError } from 'axios';

interface IModal{
    open:boolean;
    setOpen:React.Dispatch<React.SetStateAction<boolean>>
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


const Modal = ({setOpen, open}:IModal) => {
    const modalRef = useRef<HTMLDivElement>(null);
    const {mutateAsync:createExperience, isPending} = CreateExperience();
    const {register, handleSubmit, formState:{errors}} = useForm<Input>({
      defaultValues:{
        title:"",
        description:'',
        price:0,
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

    const onSubmit = async(data:Input)=>{
      try {
        const pic = data.pic[0];
        const token = Cookies.get("admin-auth-booklit-token") || '';
        const offerCode = data.offerCode || '';
        const offerPercent = data.offerPercent || 0;
        await createExperience({pic, token, bookingData:data.timings, description:data.description, offerCode, place:data.place, date:data.date, price:data.price, title:data.title, offerPercent});
        setOpen(false);
        toast.success("Experience created successfully");
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
              <div className="max-h-[90vh] overflow-y-auto rounded-md thin-scrollbar">
                <form onSubmit={handleSubmit(onSubmit)} className="w-full px-5 py-4 flex flex-col gap-3">
                <h1 className="text-center text-lg text-gray-810">Create Experience</h1>
                <div className="flex flex-col gap-2">
                  <h1 className="text-gray-810">Title*</h1>
                  <Input 
                  {...register("title", {required:{value:true, message:"Title is required"}})}
                  placeholder="My Experience" className="text-gray-810"/>
                  {errors.title && <p className='text-xs text-red-500'>{errors.title.message}</p>}
                </div>
                <div className="flex flex-col gap-2">
                  <h1 className="text-gray-810">Description*</h1>
                  <Input 
                  {...register("description", {required:{value:true, message:"Description is required"}})}
                  placeholder="It will be a good experience" className="text-gray-810"/>
                  {errors.description && <p className='text-xs text-red-500'>{errors.description.message}</p>}
                </div>
                <div className="flex flex-col gap-2">
                  <h1 className="text-gray-810">Price*</h1>
                  <Input 
                  {...register("price", {required:{value:true, message:"Price is required"}})}
                  placeholder="0" type="number" className="text-gray-810"/>
                  {errors.price && <p className='text-xs text-red-500'>{errors.price.message}</p>}
                </div>
                <div className="flex flex-col gap-2">
                  <h1 className="text-gray-810">Place*</h1>
                  <Input 
                  {...register("place", {required:{value:true, message:"Place is required"}})}
                  placeholder="Chandigarh" className="text-gray-810"/>
                  {errors.place && <p className='text-xs text-red-500'>{errors.place.message}</p>}
                </div>
                <div className="flex flex-col gap-2">
                  <h1 className="text-gray-810">Timings*</h1>
                  <Input 
                  {...register("timings", {required:{value:true, message:"Timings are required"}})}
                  placeholder="7AM 8:30PM" className="text-gray-810"/>
                  {errors.timings && <p className='text-xs text-red-500'>{errors.timings.message}</p>}
                </div>
                <div className="flex flex-col gap-2">
                  <h1 className="text-gray-810">Offer Code</h1>
                  <Input 
                  {...register("offerCode")}
                  placeholder="DIVE30" className="text-gray-810"/>
                </div>
                <div className="flex flex-col gap-2">
                  <h1 className="text-gray-810">Offer Percent</h1>
                  <Input 
                  {...register("offerPercent")}
                  placeholder="0" type="number" className="text-gray-810"/>
                </div>
                <div className="flex flex-col gap-2">
                  <h1 className="text-gray-810">Date*</h1>
                  <Input 
                  {...register("date", {required:{value:true, message:"Date is required"}})}
                  placeholder="" type="date" className="text-gray-810"/>
                  {errors.date && <p className='text-xs text-red-500'>{errors.date.message}</p>}
                </div>
                <div className="flex flex-col gap-2">
                  <h1 className="text-gray-810">Pic*</h1>
                  <Input 
                  {...register("pic", {required:{value:true, message:"Pic is required"}})}
                  placeholder="" type="file" className="text-gray-810"/>
                  {errors.pic && <p className='text-xs text-red-500'>{errors.pic.message}</p>}
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

export default Modal;
