import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import ContactCard from "../ContactCard/ContactCard";
import { useContactsList } from "../../Contexts/hooks/useContactsList";
import SearchBar from "../SearchBar";


function ContactsListCard() {
  const {contacts,setContacts} = useContactsList();
  const [searchtxt, setSearcTtxt] = useState("")

  const fetchContacts = useCallback(
    () => {
      axios.get("http://localhost:5141/contacts/getallcontacts").then((res)=>{
        setContacts(res.data)
      })
    },[setContacts]
  );
  
  useEffect(()=>{
    fetchContacts()
  },[fetchContacts])



  const searchHandler = (e : React.ChangeEvent<HTMLInputElement>)=>{
    setSearcTtxt(e.target.value)
  }

  const filteredList = contacts.filter((item)=>(item.fullname.includes(searchtxt)|| item.phon_number.includes(searchtxt) || item.birthday.includes(searchtxt)))
  return (
    <>
      <SearchBar onchange={searchHandler}/>
      <div className="bg-[#cfc64570] rounded-md w-[75%] min-w-[300px] max-w-[600px] min-h-[300px] max-h-[700px] overflow-auto p-4">
          
        {contacts.length != 0 ? 
          filteredList.length != 0 ? 
          filteredList.map(c => (
            <ContactCard  c={c} key={c.id}/>
            
          ))
          :
          <h4 className="w-full h-full content-center text-center">مخاطب مورد نظر یافت نشد</h4>
        :
          <h4 className="w-full h-full content-center text-center">مخاطبی وجود ندارد لطفا مخاطب خود را اضافه کنید</h4>
        }
      </div>
    </>
  )
}

export default ContactsListCard