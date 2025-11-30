import { useContext } from "react";
import {  ContactsContext, defaultcontacts  } from "../../../constants";
import type { ContactsContextInterface } from "../../../Types";


export const useContactsList = (): ContactsContextInterface => {
  const context = useContext(ContactsContext);
  
  if (context === defaultcontacts) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  
  return context;
};