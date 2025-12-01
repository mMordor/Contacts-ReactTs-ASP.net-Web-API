import DatePicker, { type Value } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa"
import { IoIosSearch } from "react-icons/io";
import { useState } from "react";


interface prop {
    onclick: (name : string,phone : string,date :Value)=>void
}

function SearchBarAsync({onclick}:prop) {

     const [searchedName, setSearchedName] = useState("")
     const [searchedPhone, setSearchedPhone] = useState("")
     const [searchedDate, setSearchedDate] = useState<Value>(null)


  return (
    <div className="w-[50%] flex justify-center items-center">
        <input type="text" className='min-w-[150px] h-[50px] text-[12px] bg-[white] rounded-4xl p-4' placeholder='جست و جو نام ...'  onChange={(e)=>{setSearchedName(e.target.value)}}/>
        <input type="text" className='min-w-[150px] h-[50px] text-[12px] bg-[white] rounded-4xl p-4' placeholder='جست و جو شماره همراه ...'  onChange={(e)=>{setSearchedPhone(e.target.value)}}/>
        <div className="flex justify-center items-center gap-2 w-[270px] h-[50px] bg-[white] rounded-4xl p-4">
          <DatePicker
            style={{
              width:"100px",
              backgroundColor: "aliceblue",
              height: "24px",
              borderRadius: "8px",
              fontSize: "14px",
              padding: "3px 10px"
            }}
            value={ searchedDate}
            onChange={setSearchedDate}
            calendar={persian}
            locale={persian_fa}
            calendarPosition="bottom-right"
          />
          <button onClick={()=>{setSearchedDate(null)}}>
            <p className="text-[12px]">پاک کردن</p>
          </button>
        </div>
        <button className="flex justify-center items-center gap-2 w-[50px] h-[50px] bg-[white] rounded-4xl p-4" onClick={()=>{onclick(searchedName,searchedPhone,searchedDate)}}>
          <IoIosSearch size={30}/>
        </button>
    </div>
  )
}

export default SearchBarAsync