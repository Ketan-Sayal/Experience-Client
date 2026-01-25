import { useRef, useState, useEffect } from "react"
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
import Options from "../icons/Options"
import Money from "../icons/Money"
import ThemeToggle from "./ThemeToggle"

const TopBar = () => {
  const user = useAppSelector((state)=>state.auth).value;
  const admin = useAppSelector((state)=>state.admin).value;
  const dispatch = useAppDispatch();
  const searchRef = useRef<HTMLInputElement | null>(null);
  const mobileSearchRef = useRef<HTMLInputElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  
  const navigate = useNavigate();

  const handleSearch = (ref: React.RefObject<HTMLInputElement | null>) => {
    const searchVal = ref?.current?.value;
    if(ref && ref.current && searchVal){
      ref.current.value = "";
      navigate(`/search/${searchVal}`);
      setOpen(false);
    }
  };
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open]);

  return (
    <div className="relative" ref={menuRef}>
      <div className="w-full px-4 py-4 sm:px-6 md:px-8 lg:px-12 xl:px-24 flex items-center justify-between shadow-lg bg-white dark:bg-gray-900">
        <div className="flex gap-2 sm:gap-3 items-center">
          <div className="">
            <Logo setFn={setOpen}/>
          </div>
          {user._id!=null? <>
            <Button curve="rounded-md" onlyYellow={false} className="hover:bg-gray-800  hover:text-yellow-600 duration-200 md:block hidden dark:hover:bg-yellow-600 dark:text-white dark:hover:text-black" onClick={()=>{
              dispatch(logout());
              Cookies.remove("auth-booklit-token");
              toast.success("User Logged out");
            }} text="Logout" startIcon={<Logout/>}/>
            <Button 
            onClick={()=>{
              navigate("/purchases");
            }}
            className="hover:bg-gray-800 hover:text-yellow-600 duration-200 md:block hidden dark:hover:bg-yellow-600 dark:text-white dark:hover:text-black" text="Purchases" onlyYellow={false} startIcon={<Money/>}/>
          </>: admin._id!==null?(
            <>
            <Button curve="rounded-md" text="Logout" onlyYellow={false} className="hover:bg-gray-800 hover:text-yellow-600 duration-200 md:block hidden dark:hover:bg-yellow-600 dark:text-white dark:hover:text-black" onClick={()=>{
              dispatch(adminLogout());
              Cookies.remove("admin-auth-booklit-token");
              toast.success("Admin Logged out");
            }} startIcon={<Logout/>}/>
            <Button 
            onClick={()=>{
              navigate("/admin/dashboard");
            }}
            className="hover:bg-gray-800 dark:hover:bg-yellow-600 dark:text-white dark:hover:text-black duration-200 md:block hidden" text="Dashboard" onlyYellow={false} startIcon={<Admin/>}/>
            </>
          ):(<>
            <Button text="Login" onlyYellow={false} className="bg-gray-900 dark:bg-yellow-600 text-yellow-600 dark:hover:bg-yellow-500 duration-200 md:block hidden shadow-md hover:shadow-lg transform hover:scale-105 transition-all font-medium px-4 py-2 rounded-lg border border-gray-600 dark:border-yellow-500" onClick={()=>navigate("/login")} endIcon={<Login/>}/>
            <Button text="Signup" onlyYellow={false} className="hover:bg-gray-900 dark:hover:bg-yellow-600 hover:text-yellow-600 dark:text-white dark:hover:text-black md:block hidden duration-200 shadow-md hover:shadow-lg transform hover:scale-105 transition-all font-medium px-4 py-2 rounded-lg border border-gray-300 dark:border-yellow-500 hover:border-gray-600 dark:hover:border-yellow-400" onClick={()=>navigate("/signup")} endIcon={<Signup/>}/>
            </>
          )}
        </div>
        <div className="flex gap-2 flex-shrink-0">
          <Input ref={searchRef} placeholder="Search here" className="bg-gray-200 dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 focus:border-yellow-500 dark:focus:border-yellow-400 outline-none w-32 sm:w-48 md:w-64 hidden md:block text-gray-900 dark:text-gray-100 placeholder:text-gray-600 dark:placeholder:text-gray-400"/>
          <Button text="Search" className="max-w-fit hidden md:block bg-yellow-600 hover:bg-yellow-700 dark:bg-yellow-600 dark:hover:bg-yellow-500 text-black font-medium px-4 py-2 rounded-lg shadow-sm hover:shadow-md transition-all duration-200" onClick={()=>{
            const searchVal = searchRef.current?.value;
            if(searchRef.current && searchVal){
              searchRef.current.value = "";
              navigate(`/search/${searchVal}`);
            }
          }}/>
          <ThemeToggle />
          <Button 
          onClick={()=>{
            setOpen(!open);
          }}
          onlyYellow={false} endIcon={<Options/>} className="block md:hidden max-w-fit px-3"/>
        </div>
      </div>

      
      {open && (
  <div className="md:hidden absolute top-full left-0 right-0 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 shadow-2xl border-t-2 border-yellow-600 z-50 backdrop-blur-sm animate-in slide-in-from-top duration-200">
    <div className="px-6 py-5 flex flex-col gap-4">
      <div className="flex gap-2">
        <Input 
          ref={mobileSearchRef} 
          placeholder="Search experiences..." 
          className="bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 focus:border-yellow-600 outline-none flex-1 rounded-lg transition-all duration-200 shadow-sm"
        />
        <Button 
          text="Search" 
          className="max-w-fit px-4 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all bg-yellow-600 hover:bg-yellow-700 dark:bg-yellow-600 dark:hover:bg-yellow-500 text-black dark:text-black font-medium" 
          onClick={()=>handleSearch(mobileSearchRef)}
        />
      </div>
      <div className="flex items-center gap-2">
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent"></div>
        <span className="text-xs text-gray-400 dark:text-gray-500 font-medium">MENU</span>
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent"></div>
      </div>
      <div className="flex flex-col gap-3">
        {user._id!=null? (
          <>
          <Button 
            curve="rounded-lg" 
            onlyYellow={false} 
            className="bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 shadow-md hover:shadow-lg transform hover:scale-[1.02] transition-all duration-200 w-full py-3" 
            onClick={()=>{
              dispatch(logout());
              Cookies.remove("auth-booklit-token");
              toast.success("User Logged out");
              setOpen(false);
            }} 
            text="Logout" 
            startIcon={<Logout/>}
          />
          <Button 
              onClick={()=>{
                navigate("/purchases");
                setOpen(false);
              }}
              curve="rounded-lg"
              className="bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 shadow-md hover:shadow-lg transform hover:scale-[1.02] transition-all duration-200 w-full py-3" 
              text="Purchases" 
              onlyYellow={false} 
              startIcon={<Money/>}
            />
          </>
        ): admin._id!==null?(
          <>
            <Button 
              curve="rounded-lg" 
              text="Logout" 
              onlyYellow={false} 
              className="bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 shadow-md hover:shadow-lg transform hover:scale-[1.02] transition-all duration-200 w-full py-3" 
              onClick={()=>{
                dispatch(adminLogout());
                Cookies.remove("admin-auth-booklit-token");
                toast.success("Admin Logged out");
                setOpen(false);
              }} 
              startIcon={<Logout/>}
            />
            <Button 
              onClick={()=>{
                navigate("/admin/dashboard");
                setOpen(false);
              }}
              curve="rounded-lg"
              className="bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 shadow-md hover:shadow-lg transform hover:scale-[1.02] transition-all duration-200 w-full py-3" 
              text="Dashboard" 
              onlyYellow={false} 
              startIcon={<Admin/>}
            />
          </>
        ):(
          <>
            <Button 
              text="Login" 
              curve="rounded-lg"
              onlyYellow={false} 
              className="bg-gradient-to-r from-gray-900 to-black dark:from-gray-800 dark:to-gray-700 text-yellow-400 dark:text-yellow-300 hover:from-black hover:to-gray-900 dark:hover:from-gray-700 dark:hover:to-gray-600 shadow-md hover:shadow-lg transform hover:scale-[1.02] transition-all duration-200 w-full py-3 font-semibold" 
              onClick={()=>{
                navigate("/login");
                setOpen(false);
              }} 
              endIcon={<Login/>}
            />
            <Button 
              text="Signup" 
              curve="rounded-lg"
              onlyYellow={false} 
              className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-black hover:from-yellow-600 hover:to-yellow-700 shadow-md hover:shadow-lg transform hover:scale-[1.02] transition-all duration-200 w-full py-3 font-semibold" 
              onClick={()=>{
                navigate("/signup");
                setOpen(false);
              }} 
              endIcon={<Signup/>}
            />
          </>
        )}
      </div>
    </div>
  </div>
)}

    </div>
  )
}

export default TopBar
