
export interface pageToggleContextInterface {
    iseformPage : boolean
    setPageToggleValue : (v:boolean)=>void
} 

export interface ContactsContextInterface {
    contacts : contact[]
    setContacts : (c:contact[])=>void
}

export interface contact  {
    id:string,
    fullname:string,
    phon_number:string,
    birthday:string,
    imgadress:string,
}

export interface requestcontact  {
    fullname:string,
    phon_number:string,
    birthday:string,
    imgadress:string,
}