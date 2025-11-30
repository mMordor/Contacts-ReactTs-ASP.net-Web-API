import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import PageToggleProvider from './Contexts/PageToggle.tsx'
import { RouterProvider } from 'react-router-dom'
import routs from './Routs/index.tsx'
import ContactsContextProvider from './Contexts/ContactsContext.tsx'
import { Provider } from 'react-redux'
import store from './Redux/index.ts'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <PageToggleProvider>
        <ContactsContextProvider>
            <RouterProvider router={routs} />
        </ContactsContextProvider>
      </PageToggleProvider>
    </Provider>
  </StrictMode>,
)
