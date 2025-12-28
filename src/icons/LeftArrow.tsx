interface IIcons{
    size?: "md" | "lg" | "sm";
    onClick?:()=>void
}

const sizeStyles = {
    "md": "size-4",
    "sm": "size-2",
    "lg": "size-6"
}


const LeftArrow = ({size="md", onClick=()=>{}}:IIcons) => {
  return (
      <svg 
      onClick={onClick}
      xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={`${sizeStyles[size]} font-bold cursor-pointer`}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
      </svg>
  )
}

export default LeftArrow
