import { createBrowserRouter } from "react-router-dom"
import Layout from "../Layout/Layout"
import ContactsListCard from "../Components/ContactsListCard/ContactsListCard"
import ContactForm from "../Components/ContactForm/ContactForm"



const routs = createBrowserRouter([
    {
        path : "/",
        element : <Layout/>,
        children : [
            {
                path: "/",
                element : <ContactsListCard/>
            }
            ,
            {
                path: "/addcontact",
                element : <ContactForm/>    
            }
            ,
            {
                path: "/editcontact/:id",
                element : <ContactForm/>    
            }
        ]
    }
])

export default routs