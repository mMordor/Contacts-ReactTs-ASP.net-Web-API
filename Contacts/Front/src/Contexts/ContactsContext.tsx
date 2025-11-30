import React, { useCallback, useMemo, useState} from "react"
import { ContactsContext } from "../constants";
import type { contact, ContactsContextInterface } from "../Types";

function ContactsContextProvider ({children}:{children : React.ReactNode}){
    const [contacts , setContactList] = useState<contact[]>([]);

    const setContacts = useCallback((c:contact[]) => {setContactList(c)},[])
    

    const contextValue: ContactsContextInterface = useMemo(
    () => ({
      contacts,
      setContacts
    }),
    [contacts, setContacts],
    );

    return (<ContactsContext.Provider value={contextValue}>
        {
            children
        }
    </ContactsContext.Provider> 
    )
}

export default ContactsContextProvider





