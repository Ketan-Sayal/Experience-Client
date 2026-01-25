import { Link, useNavigate } from "react-router-dom"
import Button from "../../components/Button"
import Input from "../../components/Input"
import { useForm, type SubmitHandler } from "react-hook-form";
import { SigninMutation } from "../../utils/react-queries/queries/query-mutations";
import Cookies from "js-cookie";
import { login } from "../../features/authSlice";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { toast } from "sonner";
import type { AxiosError } from "axios";

interface Inputs{
  email:string;
  password:string;
}

const Signin = () => {
   const navigate = useNavigate();
   const dispatch = useAppDispatch();
   const {mutateAsync:signin, isPending} = SigninMutation();
   
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
  
  const onSubmit: SubmitHandler<Inputs> = async(data:{email:string; password:string}) =>{
    try {
      const email = data?.email;
      const password = data?.password;
      const res = await signin({email, password});
      const user = res?.user;// react-redux
      dispatch(login(user));
      const token = res?.token;
      Cookies.set("auth-booklit-token", token, { expires: 7 });
      navigate("/");
      toast.success("User logged in");
    } catch (error) {
      const err = error as AxiosError;
      const {message} = err.response?.data as any || {message:"Something went wrong"};
      toast.error(message);

    }
    
  }

  // console.log(errors);
  

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-gray-100 dark:bg-gray-900">
      <form  onSubmit={handleSubmit(onSubmit)} className="bg-gray-50 dark:bg-gray-800 flex flex-col gap-3 p-4 rounded-md w-96 border border-gray-200 dark:border-gray-700">
        <h1 className="text-xl text-gray-800 dark:text-white">Signin:</h1>
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
        <p className="text-xs text-gray-800 dark:text-gray-400">Don't have an account? <Link className="underline text-yellow-500 hover:text-yellow-600 dark:text-yellow-400 dark:hover:text-yellow-300" to={"/signup"}>Signup</Link></p>
      </form>
    </div>
  )
}

export default Signin
