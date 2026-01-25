import React, { useEffect, useRef } from 'react'
import Button from './Button'
import Input from './Input'
import Cross from '../icons/Cross'
import { UpdateExperience } from '../utils/react-queries/queries/query-mutations';
import { useForm } from 'react-hook-form';
import Cookies from 'js-cookie';
import { toast } from 'sonner';
import type { AxiosError } from 'axios';
import TextArea from './TextArea';

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
      className="fixed inset-0 rounded-md top-0 left-0 w-screen h-screen flex p-5 pt-8 md:pt-0 lg:p-0 lg:justify-center lg:items-center bg-black/50 dark:bg-black/70 z-10">
            <div 
            ref={modalRef}
            className="bg-white dark:bg-gray-800 w-[90vw] md:w-[95vw] lg:w-1/2 min-h-96 rounded-md max-h-[75vh] md:max-h-[90vh] relative border border-gray-200 dark:border-gray-700">
              <div className="absolute top-3 right-3">
                  <Button onlyYellow={false}
                   onClick={()=>setOpen(false)}
                   className="hover:bg-gray-300 dark:hover:bg-gray-600 min-w-fit"
                   curve="rounded-full"
                   padding="p-0"
                   endIcon={<Cross/>}/>
              </div>
              <div className="max-h-[75vh] md:max-h-[90vh] overflow-y-auto rounded-md thin-scrollbar">
                <form onSubmit={handleSubmit(onSubmit)} className="w-full px-5 py-4 flex flex-col gap-3">
                <h1 className="text-center text-lg text-gray-810 dark:text-gray-200">Update Experience</h1>
                <div className="flex flex-col gap-2">
                  <h1 className="text-gray-810 dark:text-gray-200">Title</h1>
                  <Input 
                  {...register("title")}
                  placeholder="My Experience" className="text-gray-810 dark:text-gray-200"/>
                  
                </div>
                <div className="flex flex-col gap-2">
                  <h1 className="text-gray-810 dark:text-gray-200">Description</h1>
                  <TextArea
                  {...register("description")}
                  placeholder="It will be a good experience" className="text-gray-810 dark:text-gray-200"/>
                </div>
                <div className="flex flex-col gap-2">
                  <h1 className="text-gray-810 dark:text-gray-200">Price</h1>
                  <Input 
                  {...register("price")}
                  placeholder="0" type="number" className="text-gray-810 dark:text-gray-200"/>
                </div>
                <div className="flex flex-col gap-2">
                  <h1 className="text-gray-810 dark:text-gray-200">Place</h1>
                  <Input 
                  {...register("place")}
                  placeholder="Chandigarh" className="text-gray-810 dark:text-gray-200"/>
                </div>
                <div className="flex flex-col gap-2">
                  <h1 className="text-gray-810 dark:text-gray-200">Add Timings</h1>
                  <Input 
                  {...register("timings")}
                  placeholder="7AM 8:30PM" className="text-gray-810 dark:text-gray-200"/>
                </div>
                <div className="flex flex-col gap-2">
                  <h1 className="text-gray-810 dark:text-gray-200">Add Offer Code</h1>
                  <Input 
                  {...register("offerCode")}
                  placeholder="DIVE30" className="text-gray-810 dark:text-gray-200"/>
                </div>
                <div className="flex flex-col gap-2">
                  <h1 className="text-gray-810 dark:text-gray-200">Add Offer Percent</h1>
                  <Input 
                  {...register("offerPercent")}
                  placeholder="0" type="number" className="text-gray-810 dark:text-gray-200"/>
                </div>
                <div className="flex flex-col gap-2">
                  <h1 className="text-gray-810 dark:text-gray-200">Date</h1>
                  <Input 
                  {...register("date")}
                  placeholder="" type="date" className="text-gray-810 dark:text-gray-200"/>
                </div>
                <div className="flex flex-col gap-2">
                  <h1 className="text-gray-810 dark:text-gray-200">Pic</h1>
                  <Input 
                  {...register("pic")}
                  placeholder="" type="file" className="text-gray-810 dark:text-gray-200"/>
                </div>
                <Button 
                loading={isPending}
                text="Update" type="submit"/>
              </form>
              </div>
            </div>
        </div>
  )
}

export default UpdateModal;
