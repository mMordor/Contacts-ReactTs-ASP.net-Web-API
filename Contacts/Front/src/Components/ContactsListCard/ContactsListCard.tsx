import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import ContactCard from "../ContactCard/ContactCard";
import { useContactsList } from "../../Contexts/hooks/useContactsList";
import SearchBarAsync from "../SearchBarAsync";
import { DateObject, type Value } from "react-multi-date-picker";
import { toJalaali } from "jalaali-js";
import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa"
import SearchBar from "../Searchar";


function ContactsListCard() {
  const {contacts,setContacts} = useContactsList();
  const [searched, setSearched] = useState("")
  const [searchedName, setSearchedName] = useState("")
  const [searchedPhone, setSearchedPhone] = useState("")
  const [searchedDate, setSearchedDate] = useState<Value>()
  
  const fetchContacts = useCallback(
    () => {
      axios.get("http://localhost:5141/contacts/getallcontacts").then((res)=>{
        const edited = res.data.map((item )=>{
          const date = new Date(item.birthday)
          const month = String(date.getMonth() + 1).padStart(2, '0');
          const day = String(date.getDate()).padStart(2, '0');
          const res2 = toJalaali(date.getFullYear(),Number(month),Number(day))
         const date2 = new DateObject({year : res2.jy,month :res2.jm, day :res2.jd,calendar:persian,locale:persian_fa})
          return { ...item , birthday : date2.toString()}
        })
        console.log(edited)
        setContacts(edited)
      })
    },[setContacts]
  );
  
  useEffect(()=>{
    fetchContacts()
  },[fetchContacts])



  const searchHandlerasync = (name : string,phone : string,date :Value)=>{
    setSearchedName(name);
    setSearchedPhone(phone);
    setSearchedDate(date);
  }

    const searchHandler = (e :React.ChangeEvent<HTMLInputElement>)=>{
    setSearched(e.target.value)
  }

  console.log(searchedDate?.toLocaleString())
  let filteredList = [] ;
  if(searchedDate && searchedName && searchedPhone){
    filteredList = contacts.filter((item)=>((item.fullname.includes(searchedName)) && (item.phon_number.includes(searchedPhone)) && (item.birthday === searchedDate.toLocaleString())))

  }else{
    filteredList = contacts.filter((item)=>((item.fullname.includes(searched)) || (item.phon_number.includes(searched))))
  }

  return (
    <>
      <SearchBarAsync onclick={searchHandlerasync}/>
      <SearchBar  onclick={searchHandler}/>
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