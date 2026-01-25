import { Navigate, Outlet } from "react-router-dom"
import TopBar from "../components/TopBar"
import { useAppSelector } from "../hooks/useRootState"

const AdminLayout = () => {
    const admin = useAppSelector((state)=>state.admin).value;
    if(admin._id===null){
        return <Navigate to={"/"}/>
    }
  return (
    <div className="min-h-screen bg-white dark:bg-black overflow-hidden">
      <div className="w-full">
        <TopBar/>
      </div>
      <div className="px-2 py-2 lg:px-24 lg:py-4">
        <Outlet/>
      </div>
    </div>
  )
}

export default AdminLayout
