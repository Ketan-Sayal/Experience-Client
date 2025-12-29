import { Navigate } from "react-router-dom";
import { GetAllExperiences } from "../../utils/react-queries/queries/query-mutations";
import Card from "../../components/Card";
import Button from "../../components/Button";
import Plus from "../../icons/Plus";
import { useState } from "react";
import Modal from "../../components/Modal";



const AdminDashboard = () => {
  const {data, isLoading, isError} = GetAllExperiences();
  const [open, setOpen] = useState(false);
  if(isError){
    return <Navigate to={"/"}/>
  }



  if(isLoading){
    return <div className="w-full pt-2">
        <h4 className='text-gray-500 pt-2 text-xs text-center'>Loading...</h4>
    </div>
  }



  return (
    <div className="w-full h-full overflow-auto p-1 md:p-4">
      {open && <Modal open={open} setOpen={setOpen}/>}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        <div className="w-full xl:w-64 xl:relative xl:top-14 h-[12rem] bg-gray-100 rounded-lg shadow flex justify-center items-center">
            <Button 
            onClick={()=>setOpen(true)}
            text="Create" className="max-w-fit" endIcon={<Plus/>}/>
        </div>
        {data.experiences && data.experiences.length>0 && data.experiences.map(({title, pic, place, price, description, _id}:{title:string; pic:string; place:string, price:number; description:string; _id:string}, i:number)=><Card 
        key={_id || i}
        _id={_id} 
        title={title} 
        pic={pic}
        place={place}
        price={price}
        isUpdateOrDelete={true}
        description={description} 
        />)}
        
      </div>
    </div>
  )
}



export default AdminDashboard;
