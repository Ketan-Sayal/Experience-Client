import { Outlet } from "react-router-dom"
import TopBar from "../components/TopBar"

const RootLayout = () => {

  return (
    <div className="min-h-screen bg-white">
      <div className="w-full">
        <TopBar/>
      </div>
      <Outlet/>
    </div>
  )
}

export default RootLayout
