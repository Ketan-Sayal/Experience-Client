import { useParams } from "react-router-dom";
import Button from "../../components/Button";
import Tick from "../../icons/Tick";

const Confirm = () => {
  const {id} = useParams();
  return (
    <div className="px-24 py-8 flex flex-col items-center gap-2 justify-center">
      <div className="pb-3">
        <Tick/>
      </div>
      <p className="text-xl font-semibold">Booking Confirmed</p>
      <p className="text-sm text-gray-810">Ref ID: {id}</p>
      <Button onlyYellow={false} className="bg-gray-50 text-gray-810 w-fit text-xs" text="Back to Home"/>
    </div>
  )
}

export default Confirm
