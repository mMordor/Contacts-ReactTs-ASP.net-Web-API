import {AiFillPlusSquare} from 'react-icons/ai'
import { AiFillCloseSquare } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';
import { usePageFormToggle } from '../../Contexts/hooks/usePageFormToggle';




function Haedar() {
   
  const s = useNavigate();
  const {iseformPage , setPageToggleValue} = usePageFormToggle();

  function handelClick(): void {
    if(iseformPage){
      setPageToggleValue(false);
      s("/");
    }else{
      s("/addcontact")
      setPageToggleValue(true);
    }
    
  }

  return (
    <div className="w-full h-[100px] bg-[#ad9925] flex justify-center items-center relative">
      <div className="left-8 absolute">
       {iseformPage ? <AiFillCloseSquare className='cursor-pointer' size={60 } onClick={handelClick}/> : <AiFillPlusSquare className='cursor-pointer' size={60} onClick={handelClick} /> } 
      </div>
      <h1 className="text-white">
        مخاطبین
      </h1>
    </div>
  )
}

export default Haedar