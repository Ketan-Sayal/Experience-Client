import { Navigate, Outlet } from 'react-router-dom'
import { useAppSelector } from '../hooks/useRootState'
import ThemeToggle from '../components/ThemeToggle'

const AuthLayout = () => {

    const user = useAppSelector((state)=>state.auth).value;
    const admin = useAppSelector((state)=>state.admin).value;
    if(user._id!==null || admin._id!==null){
        return <Navigate to={"/"}/>
    }

  return (
    <div className='w-full h-full relative'>
      <div className='absolute top-4 right-4 z-10'>
        <ThemeToggle />
      </div>
      <Outlet/>
    </div>
  )
}

export default AuthLayout
