import { forwardRef } from "react";

interface ITextArea{
    placeholder:string;
    className?:string;
}

const TextArea = forwardRef<HTMLTextAreaElement, ITextArea>(({
    placeholder,
    className="",
    ...props
}, ref)=>{
    return <textarea rows={10} cols={5} ref={ref} placeholder={placeholder} className={`px-3 py-2 bg-gray-300 rounded-md outline-none focus:outline focus:outline-gray-600 text-black font-normal ${className}`} {...props}/>
});

export default TextArea;