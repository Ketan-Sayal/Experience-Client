import { useNavigate, useParams } from "react-router-dom";
import Button from "../../components/Button";
import Tick from "../../icons/Tick";

const Confirm = () => {
  const {id} = useParams();
  const navigate = useNavigate();
  return (
    <div className="w-full px-4 py-4 sm:px-6 md:px-8 lg:px-24 flex flex-col items-center gap-2 justify-center">
      <div className="pb-3">
        <Tick/>
      </div>
      <p className="text-base md:text-xl font-semibold">Booking Confirmed</p>
      <p className="text-xs md:text-sm text-gray-810">Ref ID: {id}</p>
      <Button onlyYellow={false} 
      onClick={()=>{
        navigate("/");
      }}
      className="bg-gray-50 text-gray-810 max-w-fit text-xs" text="Back to Home"/>
    </div>
  )
}

export default Confirm
