import { createContext } from "react";
import type { contact, ContactsContextInterface, pageToggleContextInterface } from "./Types";

export const defaulpage = {
    iseformPage : false,
    setPageToggleValue: (v:boolean) => {
        console.log(v);
    }
}
export const defaultcontacts = {
   contacts : [],
   setContacts : (c:contact[])=>{
        console.log(c)
   }
}
export const PageToggleContext = createContext<pageToggleContextInterface>(defaulpage);
export const ContactsContext = createContext<ContactsContextInterface>(defaultcontacts);
