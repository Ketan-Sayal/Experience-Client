import { useForm } from "react-hook-form";
import Button from "../../components/Button"
import Input from "../../components/Input"
import { AdminSigninMutation } from "../../utils/react-queries/queries/query-mutations";
import Cookies from "js-cookie";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { adminLogin} from "../../features/adminSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import type { AxiosError } from "axios";

interface Inputs{
  email:string;
  password:string;
}

const AdminLoginPage = () => {
    const {mutateAsync:signin, isPending} = AdminSigninMutation();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
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

      const onSubmit = async(data:Inputs)=>{
        try {
          const res = await signin(data);
          const token = res.token;
          Cookies.set("admin-auth-booklit-token", token, { expires: 7 });
          const admin = res?.Admin;
          dispatch(adminLogin(admin));
          navigate("/admin/dashboard");
          toast.success("Admin logged in");
        } catch (error) {
          const err = error as AxiosError;
          const {message} = err.response?.data as any || {message:"Something went wrong"};
          toast.error(message);
        }
      }

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-gray-100 dark:bg-gray-900">
      <form  onSubmit={handleSubmit(onSubmit)} className="bg-gray-50 dark:bg-gray-800 flex flex-col gap-3 p-4 rounded-md w-96 border border-gray-200 dark:border-gray-700">
        <h1 className="text-xl text-gray-800 dark:text-white">Admin Signin:</h1>
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
      </form>
    </div>
  )
}

export default AdminLoginPage
