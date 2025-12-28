import { forwardRef } from "react";

interface IInput{
    type?: "text" | "number" | "password" | "email" | "date" | "file";
    placeholder:string;
    className?:string;
}

const Input = forwardRef<HTMLInputElement, IInput>(({
    type="text",
    placeholder,
    className="",
    ...props
}, ref)=>{
    return <input type={type} ref={ref} placeholder={placeholder} className={`px-3 py-2 bg-gray-300 rounded-md outline-none focus:outline focus:outline-gray-600 text-black font-normal ${className}`} {...props}/>
});

export default Input;