import { useEffect, useState } from "react"
import { RiDeleteBin5Fill } from "react-icons/ri";
import { RiEdit2Fill } from "react-icons/ri";
import type {contact} from "../../Types";
import { useNavigate, } from "react-router-dom";
import axios from "axios";
import { usePageFormToggle } from "../../Contexts/hooks/usePageFormToggle";
import { useContactsList } from "../../Contexts/hooks/useContactsList";
import defultpnng from "../../assets/user-png-33842.png"


interface props  {
    c:contact,

}

function ContactCard({c}:props) {
  const {setPageToggleValue} = usePageFormToggle()
  const {contacts,setContacts} = useContactsList();
  const [optionstoggle,setOptionsToggle] = useState(false);
  const [cimg,setCIMG] = useState("");
  const navigat = useNavigate();

  useEffect(()=>{
    axios.get(`http://localhost:5141/contacts/images/${c.id}`).then((res)=>{
      if(res.status == 200){
        setCIMG(`http://localhost:5141/contacts/images/${c.id}`)
      }
      console.log("rerendered");
    })
  },[c.id])

  
  const handleToggle = ()=>{
    setOptionsToggle(!optionstoggle)
  } 

  function setEditMode(){
    setPageToggleValue(true)
    navigat(`/editcontact/${c.id}`)
    
  }

   async function deleteContact(id:string) {
    try {
      const res = await axios.delete(`http://localhost:5141/contacts/delcontact/${id}`)
      await axios.delete(`http://localhost:5141/contacts/delcontactimg/${id}`)
      const updated = contacts.filter(c => c.id !== id);
      setContacts(updated)
      navigat(`/`)
      return res.data
    }catch (e){
      console.log(e)
    }
  }


  return (
    <div className="w-full relative">
      <div className={`z-1 w-full h-[30px] flex rounded-md absolute ${optionstoggle ? "bottom-[-30px]" : "bottom-0 hidden"} right-[1%] transition-transform-[]`}>
        <button 
          className="w-[49%] h-full border-0 bg-amber-400 rounded-b-md flex justify-center items-center hover:bg-[#dda235] cursor-pointer"
          onClick={setEditMode}
        >
          <RiEdit2Fill/>
        </button>
        <button 
          className="w-[49%] h-full border-0 bg-red-400 rounded-b-md flex justify-center items-center hover:bg-[#dd3535] cursor-pointer"
          onClick={()=>{deleteContact(c.id)}}
        >
          <RiDeleteBin5Fill/>
        </button>
      </div>
      <div onClick={handleToggle} className={`z-1000 w-full bg-amber-50 border-[#1d1d1d] border-1 rounded-md h-min-[50px] flex justify-items-start items-center ${optionstoggle ? "mb-10" : "mb-2"} p-2 gap-3 shadow-2xl hover:bg-[#dbdbdbad] cursor-pointer `}>
        <div className="w-[50px] h-[50px] rounded-full bg-[#ffa733] overflow-hidden bg-cover bg-center"><img src={cimg ? cimg : defultpnng} alt="" /></div>
        <div className="w-[calc(100%-62px)] flex justify-between items-center pl-4">
          <h3>{c.fullname}</h3>
          <h5>{c.phon_number}</h5>
        </div>
      </div>
    </div>
  )
}

export default ContactCard