import Button from './Button'

interface IToggleButton{
    text:string;
    onClick: ()=>void;
    value: string | number;
}


const ToggleButton = ({text, value, onClick}:IToggleButton) => {

  return (
    <Button onlyYellow={false} text={text} onClick={onClick} className={`max-w-fit ${value !== text?"bg-transparent border border-gray-810 text-gray-810 hover:border-none hover:text-black hover:bg-yellow-600 transition-all duration-200 dark:hover:text-black dark:text-white":"bg-yellow-600 dark:text-black"}`}/>
  )
}

export default ToggleButton
