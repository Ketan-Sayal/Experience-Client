import { Link, useNavigate } from "react-router-dom"
import Button from "../../components/Button"
import Input from "../../components/Input"
import { useForm, type SubmitHandler } from "react-hook-form";
import { SignupMutation } from "../../utils/react-queries/queries/query-mutations";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import Cookies from "js-cookie";
import { login } from "../../features/authSlice";
import { toast } from "sonner";
import type { AxiosError } from "axios";


interface Inputs{
  email:string;
  password:string;
  username:string
}

const Signup = () => {
   const {mutateAsync:signin, isPending} = SignupMutation();
   const navigate = useNavigate();
   const dispatch = useAppDispatch();

   const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues:{
      email:"", 
      password:""
    }
  });
  
  const onSubmit: SubmitHandler<Inputs> = async(data:{email:string; password:string; username:string}) =>{
    try {
      const email = data?.email;
      const password = data?.password;
      const username = data.username
      const res = await signin({email, password, username});
      const user = res?.user;// react-redux
      dispatch(login(user));
      const token = res?.token;
      Cookies.set("auth-booklit-token", token, { expires: 7 });
      navigate("/");
      toast.success("User signed up");
    } catch (error) {
      
      const err = error as AxiosError;
      const {message} = err.response?.data as any || {message:"Something went wrong"};
      toast.error(message);
    }
    
  }
  

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <form  onSubmit={handleSubmit(onSubmit)} className="bg-gray-50 flex flex-col gap-3 p-4 rounded-md w-96">
        <h1 className="text-xl">Signup:</h1>
        <Input type="text" placeholder="Username" {...register("username", {required:{
          value:true,
          message:"Email is required"
        }})}/>
        <Input type="email" placeholder="Email" {...register("email", {required:{
          value:true,
          message:"Email is required"
        }})}/>
        {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
        <Input type="password" placeholder="Password" {...register("password", {required:{
          value:true,
          message:"Password is required"
        }})}/>
        {errors.password && <p className="text-xs text-red-500">{errors.password.message}</p>}
        <Button text="Submit" loading={isPending} type="submit"/>
        <p className="text-xs">Already have an account? <Link className="underline text-yellow-500" to={"/"}>Signup</Link></p>
      </form>
    </div>
  )
}

export default Signup;
