import { useEffect, useEffectEvent, useState } from "react"
import axios from "axios";
import Cookies from "js-cookie";
import { config } from "./config";
import { useAppDispatch } from "./hooks/useAppDispatch";
import { login, logout } from "./features/authSlice";
import { Outlet } from "react-router-dom";
import MainSkeleton from "./components/MainSkeleton";
import { adminLogin, adminLogout } from "./features/adminSlice";
import { Toaster } from "./components/ui/sonner";



function App() {
  //const naviagate = useNavigate();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

  const updateLoading = useEffectEvent(()=>{
    setLoading(false);
  });

  useEffect(()=>{
    const token = Cookies.get("auth-booklit-token");
    const adminToken = Cookies.get("admin-auth-booklit-token");
    
    if(token && token!=undefined){
    axios.get(`${config.backendUrl}/api/v1/users/user/data`, {
            headers:{
                Authorization:token
            }
        }).then((res)=>{
          const user = res.data.data.user;
          dispatch(login(user));
        }).catch((err)=>{
          dispatch(logout());
          console.log(err); 
        }).finally(()=>{
          setLoading(false);
        });
    }else if(adminToken && adminToken!==undefined){
      axios.get(`${config.backendUrl}/api/v1/admins/get`, {headers:{
        Authorization: adminToken,
      }}).then((res)=>{
        const data = res.data?.data;
        const admin = data.admin;
        dispatch(adminLogin(admin));
      }).catch((err)=>{
        console.log(err);
        dispatch(adminLogout());
      }).finally(()=>{
        setLoading(false);
      });
    }else{
      updateLoading();
    }
  }, []);
  

  return !loading?(
    <>
    <Outlet/>
    <Toaster />
    </>
  ):(<MainSkeleton/>)
}

export default App
