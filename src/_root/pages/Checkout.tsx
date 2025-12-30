import { Navigate, useNavigate, useParams } from "react-router-dom"
import Button from "../../components/Button"
import Input from "../../components/Input"
import { useAppSelector } from "../../hooks/useRootState"
import LeftArrow from "../../icons/LeftArrow"
import { useAppDispatch } from "../../hooks/useAppDispatch"
import { setDate } from "../../features/dateSlice"
import { setTime } from "../../features/timeSlice"
import { useForm, type SubmitHandler } from "react-hook-form"
import { setSubTotal } from "../../features/subTotalSlice"
import { resetQuantity } from "../../features/quantitySlice"
import { useState } from "react"
import Cookies from "js-cookie";
import { BookExperenceMutation, ValidatePromoMutation } from "../../utils/react-queries/queries/query-mutations"
import { toast } from "sonner"
import type { AxiosError } from "axios"

interface Inputs{
  name:string;
  email:string;
  promo_code:string;
}


const Checkout = () => {
    const {mutateAsync:bookExperience, isPending:isLoadingBooking} = BookExperenceMutation();
    const {mutateAsync:validatePromo, isPending} = ValidatePromoMutation();
    const [promoCode, setPromoCode] = useState("");
    const {id} = useParams();
    const date = useAppSelector((state)=>state.date).value;
    const time = useAppSelector((state)=>state.time).value;
    const subTotal = useAppSelector((state)=>state.subTotal).value;
    const quantity = useAppSelector((state)=>state.quantity).value;
    const experience = useAppSelector((state)=>state.experience).value;
    const user = useAppSelector((state)=>state.auth).value;
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [prevSub] = useState(subTotal);
    const [discount , setDiscount] = useState(0);
    
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm<Inputs>({
        defaultValues:{
          email:"",
          name:"", 
          promo_code:""
        }
      });
    
    if(!date || !time || subTotal<0 || !experience){
        return (
          <Navigate to={`/experience/details/${id}`}/>
        )
    }

    const promoCodeSubmit:SubmitHandler<Inputs> = (data)=>{
        // console.log(data);
        const promoCode  = data.promo_code;
        const offerData = experience.offerCodesData.find((offer)=>offer.code===promoCode);
        if(!offerData){
            toast.error("Offer code is invalid");
            return;
        }
        setPromoCode(offerData.code);
        const discount = experience.price * (offerData.offerPercent)/100;
        setDiscount(discount);
        dispatch(setSubTotal(prevSub-discount));
    }
    

    const payAmmount = async()=>{
        const token = Cookies.get("auth-booklit-token")||"";
        if(!token || user._id===null){
            navigate("/login");
            return;
        }
        try {
            if(discount){
                await validatePromo({token, offerCode:promoCode, experienceId:experience?._id});
            }

            const res = await bookExperience({experienceId:experience?._id, date:new Date(date), timings:time, token, amount:subTotal+59, user});
            if(!res){
                toast.error("Payment failed");
            }else{
                navigate(`/confirm/${res}`);
                toast.success("Booking successful");
            }
            
        } catch (error) {
            setDiscount(0);
            //console.log(error);
            const err = error as AxiosError;
            const {message} = err.response?.data as any || {message:"Something went wrong"};
            toast.error(message);
        }
    }
    
  return (
    <div className="w-full px-4 py-4 sm:px-6 md:px-8 lg:px-24">
      <div className="flex items-center gap-2">
        <LeftArrow 
        onClick={()=>{
            dispatch(setDate(new Date()));
            dispatch(setTime(""));
            dispatch(setSubTotal(experience?.price));
            dispatch(resetQuantity());
            navigate(`/experience/details/${id}`);
        }}
        />
        <p className="font-semibold text-xs">Checkout</p>
      </div>
      <div className="pt-4 flex flex-col md:flex-row gap-7 w-full">
        <div className="bg-gray-50 p-4 w-full md:w-[60%] h-fit rounded-md">
            <form 
            onSubmit={handleSubmit(promoCodeSubmit)}
            className="flex flex-col gap-4 w-full">
                <div className="flex gap-4 w-full">
                    <div className="flex flex-col gap-3 w-[50%]">
                        <p className="text-gray-400 text-base">Full Name</p>
                        <Input placeholder="Your name" {...register("name", {required:{
                            value:true,
                            message:"Name is required"
                        }})}/>
                        {errors.name?.message && <p className="text-xs text-red-500">{errors.name.message}</p>}
                    </div>
                    <div className="flex flex-col gap-3 w-[50%]">
                        <p className="text-gray-400 text-base">Email</p>
                        <Input placeholder="Your email" {...register("email", {required:{
                            value:true,
                            message:"Email is required"
                        }})}/>
                        {errors.email?.message && <p className="text-xs text-red-500">{errors.email.message}</p>}
                    </div>
                </div>
                <div className="flex gap-4 items-center w-full">
                    <div className="w-full flex flex-col gap-3">
                        <Input placeholder="Promo code" className="w-full" {...register("promo_code", {required:{
                        value:true,
                        message:"Promo code is required"
                    }})}/>
                    
                    </div>
                    {errors.promo_code?.message && <p className="text-xs text-red-500">{errors.promo_code.message}</p>}
                    <Button type="submit" text="Apply" onlyYellow={false} className="bg-black max-w-fit text-white"/>
                </div>
            </form>
        </div>
        <div className="bg-gray-50 p-4 w-full md:w-[50%] flex flex-col gap-1 rounded-lg max-h-fit">
                <div className="flex justify-between items-center">
                    <p className="text-xs text-gray-810">Experience</p>
                    <p className="text-xs">{experience?.title}</p>
                </div>

                <div className="flex justify-between items-center">
                    <p className="text-xs text-gray-810">Date</p>
                    <p className="text-xs">{`${new Date(date).toLocaleString("en-US", {month:"short"})} ${new Date(date).getDate()}, ${new Date(date).getFullYear()}`}</p>
                </div>
                
                <div className="flex justify-between items-center">
                    <p className="text-xs text-gray-810">Time</p>
                    <p className="text-xs text-gray-810">{time}</p>
                </div>
                
                <div className="flex justify-between items-center">
                    <p className="text-xs text-gray-810">Qty</p>
                    <p className="text-xs text-gray-810">{quantity}</p>
                </div>
                
                <div className="flex justify-between items-center">
                    <p className="text-xs text-gray-810">Subtotal</p>
                    <p className="text-xs text-gray-810">₹{(prevSub>0 && discount>0)?`${prevSub} - ₹${discount}`:subTotal}</p>
                </div>
                
                <div className="flex justify-between items-center">
                    <p className="text-xs text-gray-810">Taxes</p>
                    <p className="text-xs text-gray-810">₹59</p>
                </div>
                <hr className="text-gray-810 font-bold"/>
                <div className="flex justify-between py-3 items-center">
                    <p className="text-base font-semibold">Total</p>
                    <p className="text-base font-semibold">₹{subTotal+59}</p>
                </div>
                <Button 
                onClick={payAmmount}
                disabled={isPending || isLoadingBooking}
                text="Pay and Confirm"/>
            </div>
      </div>
    </div>
  )
}

export default Checkout
