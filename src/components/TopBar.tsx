import { useRef } from "react"
import Logo from "../icons/Logo"
import Button from "./Button"
import Input from "./Input"
import { useNavigate } from "react-router-dom"
import { useAppSelector } from "../hooks/useRootState"
import Logout from "../icons/Logout"
import { useAppDispatch } from "../hooks/useAppDispatch"
import { logout } from "../features/authSlice"
import Cookies from "js-cookie"
import { adminLogout } from "../features/adminSlice"
import Admin from "../icons/Admin"
import Login from "../icons/Login"
import Signup from "../icons/Signup"
import { toast } from "sonner"

const TopBar = () => {
  const user = useAppSelector((state)=>state.auth).value;
  const admin = useAppSelector((state)=>state.admin).value;
  const dispatch = useAppDispatch();
  const searchRef = useRef<HTMLInputElement>(null);
  // console.log(user);
  //console.log(admin);
  
  const navigate = useNavigate();

  return (
    <div className="px-24 py-4 flex items-center justify-between shadow-lg">
      <div className="flex gap-3">
        <div className="">
          <Logo/>
        </div>
        {user._id!=null? <>
          <Button curve="rounded-md" onlyYellow={false} className="hover:bg-black hover:text-yellow-600 duration-200" onClick={()=>{
            dispatch(logout());
            Cookies.remove("auth-booklit-token");
            toast.success("User Logged out");
          }} text="Logout" startIcon={<Logout/>}/>
        </>: admin._id!==null?(
          <>
          <Button curve="rounded-md" text="Logout" onlyYellow={false} className="hover:bg-black hover:text-yellow-600 duration-200" onClick={()=>{
            dispatch(adminLogout());
            Cookies.remove("admin-auth-booklit-token");
            toast.success("Amin Logged out");
          }} startIcon={<Logout/>}/>
          <Button 
          onClick={()=>{
            navigate("/admin/dashboard");
          }}
          className="hover:bg-black hover:text-yellow-600 duration-200" text="Dashboard" onlyYellow={false} startIcon={<Admin/>}/>
          </>
        ):(<>
          <Button text="Login" onlyYellow={false} className="bg-black text-yellow-600 duration-200" onClick={()=>navigate("/login")} endIcon={<Login/>}/>
          <Button text="Signup" onlyYellow={false} className="hover:bg-black hover:text-yellow-600 duration-200" onClick={()=>navigate("/signup")} endIcon={<Signup/>}/>
          </>
        )}
      </div>
      <div className="flex gap-2">
        
        <Input ref={searchRef} placeholder="Search here" className="bg-gray-300 border-2 border-gray-700 outline-none"/>
        <Button text="Search" onClick={()=>{
          const searchVal = searchRef.current?.value;
          if(searchRef.current && searchVal){
            searchRef.current.value = "";
            navigate(`/search/${searchVal}`);
          }
        }}/>
      </div>
    </div>
  )
}

export default TopBar
