import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

const Logo = () => {
  const navigate = useNavigate();
  return (
    <div className="w-24 h-12">
        <img className="w-full h-full cursor-pointer" onClick={()=>navigate("/")} src={logo} alt="Logo" />
    </div>
  )
}

export default Logo
