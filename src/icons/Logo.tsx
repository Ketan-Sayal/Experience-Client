import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import type React from "react";

const Logo = ({setFn}:{setFn:React.Dispatch<React.SetStateAction<boolean>>}) => {
  const navigate = useNavigate();
  return (
    <div className="w-24 h-12">
        <img className="w-full h-full cursor-pointer" onClick={()=>{
          navigate("/");
          setFn(false);
          }} src={logo} alt="Logo" />
    </div>
  )
}

export default Logo
