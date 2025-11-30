import axios from "axios";
import { useEffect, useState } from "react";
import { useForm, type FieldValues } from "react-hook-form"
import { useNavigate, useParams } from "react-router-dom";
import type {contact,requestcontact} from "../../Types";
import { usePageFormToggle } from "../../Contexts/hooks/usePageFormToggle";
import { useContactsList } from "../../Contexts/hooks/useContactsList";




function ContactForm() {
  const p = useParams();
  const navigate = useNavigate();
  const {setPageToggleValue} = usePageFormToggle();
  const {contacts,setContacts} = useContactsList();
  const [contact,setContact] = useState<contact>({
    id:"",
    fullname:"",
    phon_number:"",
    birthday:"",
    imgadress:"",
  });
  const [imageselcted, setImageSelected] = useState<File>();
  const [iseditmode ,setIsEditMode] = useState(false);
  const { register,handleSubmit,formState:{errors} , reset} = useForm( {
      defaultValues : contact
    }
  );

  

  useEffect(()=>{
    if(p.id){
      axios.get(`http://localhost:5141/contacts/get/${p.id}`).then(res => {
            setContact(res.data)
            setIsEditMode(true)
            const date = new Date(res.data.birthday)
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');

            const converteddate = `${date.getFullYear()}-${month}-${day}`

            reset({
                fullname: res.data.fullname,
                phon_number: res.data.phon_number,
                birthday: converteddate,
            });
            
        })
    }
  },[p.id,reset])


  async function updateContact(c:contact) {
    try{
      const res = await axios.put("http://localhost:5141/contacts/upcontacts",c)

      const formData = new FormData();

      if(imageselcted != undefined){
        formData.append("parentId", res.data.id);
        formData.append("imagefile", imageselcted )
        const res2 = await axios.put("http://localhost:5141/contacts/images", formData,{
          headers : {
          "Content-Type" : 'multipart/form-data'
        }})
        return res2.data
      }else{
        const res2 = await axios.delete(`http://localhost:5141/contacts/delcontactimg/${c.id}`)
        console.log(c.id)
        return res2.data
      }

    }catch(e){
      console.log(e);
      throw e;
    }
  }
  
  async function addContact(c:requestcontact) {
    try{
      const res = await axios.post("http://localhost:5141/contacts/create",c)

      const formData = new FormData();

      if(imageselcted != undefined){
        formData.append("parentId", res.data.id);
        formData.append("imagefile", imageselcted )
        const res2 = await axios.post("http://localhost:5141/contacts/images", formData,{
          headers : {
          "Content-Type" : 'multipart/form-data'
        }})
        return res2.data
      }else{
        formData.append("parentId", res.data.id);
        formData.append("imagefile", "" )
        const res2 = await axios.post("http://localhost:5141/contacts/images", formData,{
          headers : {
          "Content-Type" : 'multipart/form-data'
        }})
        return res2.data
      }

    }catch(e){

      console.log(e);

      throw e;
    }
  }

  const submitHandle = (data:FieldValues) =>{

    const dateObject = new Date(`${data.birthday}T00:00:00.000Z`);
    const isoStringForDB = dateObject.toISOString();

    if(iseditmode){
      const newcontact : contact = {
        id: contact.id,
        fullname: data.fullname,
        birthday: isoStringForDB,
        phon_number: data.phon_number,
        imgadress: ""
      }
      

      const update = contacts.map( c =>
        c.id === newcontact.id ? newcontact : c
      )
      setContacts(update)
      updateContact(newcontact)

    }else{

      const newcontact : requestcontact = {
        fullname: data.fullname,
        birthday: isoStringForDB,
        phon_number: data.phon_number,
        imgadress: ""
      }

      setContacts([...contacts , {...newcontact , id:"5435"}])
      addContact(newcontact)
      
    }
    setPageToggleValue(false)
    navigate('/');

  }

  


  function handleImgeSelect(event: React.ChangeEvent<HTMLInputElement>): void {
    if(event.target.files != undefined){
      setImageSelected(event.target.files[0]);
    }
    
  }
 
  return (
    <div className="bg-[#cfc64570] rounded-md w-[75%] min-w-[300px] max-w-[600px] min-h-[300px] max-h-[700px] overflow-auto p-4">
      <form onSubmit={handleSubmit(submitHandle)} className="w-full flex flex-col gap-3 p-4">

        <input className="p-4 bg-amber-50 text-gray-600 rounded-md"
        {...register( "fullname" , {required:"مقادیر را پر کنید"}) } type="text" placeholder="نام کامل"></input>
        <p className="text-red-600">{errors.fullname?.message}</p>

        
        <input className="p-4 bg-amber-50 text-gray-600 rounded-md"
        {...register("phon_number" , {required:"مقادیر را پر کنید",maxLength:{value:13,message:"مقدار بای دد 13 یا 11 رقم یاشد"},minLength:{value:11,message:"مقدار بای دد 13 یا 11 رقم یاشد"}}) } type="text" placeholder="شماره همراه"></input>
        <p className="text-red-600">{errors.phon_number?.message}</p>

        <input className="p-4 bg-amber-50 text-gray-600 rounded-md"
        {...register("birthday" , {required:"مقادیر را پر کنید"}) } type="date" placeholder="تاریخ تولد"></input>
        <p className="text-red-600">{errors.birthday?.message}</p>

        <input {...register("imgadress")} type="file" accept="image/*" className="p-4 bg-amber-50 text-gray-600 rounded-md"
          onChange={handleImgeSelect}
        />

        <button className="bg-green-400 text-white p-4 rounded-md hover:bg-green-600 cursor-pointer" type="submit">ذخیره</button>
      </form>
    </div>
  )
}

export default ContactForm