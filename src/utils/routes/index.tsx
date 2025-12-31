import type { ReactElement } from "react";
import { AdminLoginPage, Signin, Signup } from "../../_auth";
import { Home, ExperiencePage, Checkout, Confirm, SearchPage, AdminDashboard, Purchases } from "../../_root";
import RootLayout from "../../_root/RootLayout";
import AuthLayout from "../../_auth/AuthLayout";
import AdminLayout from "../../_root/AdminLayout";

interface IRoutes{
    path:string;
    element:ReactElement;
    layout: ReactElement | null;
}

export const routes:IRoutes[] = [
    {
        path:"/",
        element:<Home/>,
        layout: <RootLayout/>
    }, 
    {
        path:"/login",
        element: <Signin/>,
        layout: <AuthLayout/>
    },
    {
        path:"/signup",
        element:<Signup/>,
        layout: <AuthLayout/>
    },
    
    {
        path:"/experience/details/:id",
        element:<ExperiencePage/>,
        layout: <RootLayout/>
    },
    {
        path:"/checkout/:id",
        element:<Checkout/>,
        layout: <RootLayout/>
    },
    {
        path:"/confirm/:id",
        element:<Confirm/>,
        layout: <RootLayout/>
    },
    {
        path:"/search/:searchVal",
        element:<SearchPage/>,
        layout: <RootLayout/>
    },
    {
        path:"/admin/login",
        element:<AdminLoginPage/>,
        layout: <AuthLayout/>
    },
    {
        path:"/admin/dashboard",
        element:<AdminDashboard/>,
        layout: <AdminLayout/>
    },
    {
        path:"/purchases",
        element:<Purchases/>,
        layout: <RootLayout/>
    }
]