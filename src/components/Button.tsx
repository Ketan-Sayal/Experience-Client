import type { ReactElement } from "react";
import { SpinnerCircular } from 'spinners-react';


interface IButton{
    text?:string;
    onClick?:(()=>void) | (()=>Promise<void>);
    className?:string;
    type?: "button" | "submit";
    disabled?:boolean;
    onlyYellow?:boolean;
    endIcon?: ReactElement | null;
    curve?: "rounded-md" | "rounded-full" | "rounded-lg";
    startIcon?:ReactElement | null;
    padding?: "p-4" | "p-0" | "",
    loading?:boolean;
    loadingText?:string;
}


const Button = ({
    text="",
    className="",
    onClick=()=>{},
    type="button",
    disabled=false,
    onlyYellow=true,
    endIcon=null,
    curve="rounded-md",
    startIcon=null,
    padding="p-4",
    loading=false,
    loadingText="Loading",
    ...props
}:IButton) => {
  const defaultStyles = `${padding} w-full text-center ${onlyYellow ? 'text-black' : 'text-black dark:text-black'} px-2 py-2 lg:px-3 lg:py-2 font-medium disabled:bg-gray-600 disabled:text-gray-500 text-xs xl:text-sm xl:text-base`;
  return (
    <button 
    type={type}
    className={`${onlyYellow?"bg-yellow-600":""} ${defaultStyles} ${className} ${curve} transition-all duration-200`} disabled={disabled || loading} onClick={(e)=>{
      e.stopPropagation();
      onClick();
    }} {...props}>
      {loading?(
        <div className="flex gap-1 sm:gap-2 justify-center items-center text-white">
          {loadingText && <p className="font-semibold text-xs sm:text-sm xl:text-base whitespace-nowrap">{loadingText}</p>}
          <SpinnerCircular size={20} thickness={100} speed={100} color="rgba(0, 0, 0, 0.44)" secondaryColor="#ffffff" />
        </div>
      ):text?(<div className="flex items-center justify-center gap-1">
        {startIcon && <span className="flex-shrink-0">{startIcon}</span>}
        <p className="whitespace-nowrap overflow-hidden text-ellipsis">{text}</p>
        {endIcon && <span className="flex-shrink-0">{endIcon}</span>}
      </div>):(<>
      {startIcon && startIcon}
      {endIcon && endIcon}
      </>
      )}
    </button>
  )
}


export default Button
