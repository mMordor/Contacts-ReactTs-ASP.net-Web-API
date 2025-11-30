import { configureStore } from "@reduxjs/toolkit";
import contactsSlice from './slices/ContactsSlice';

const store = configureStore(
    {
        reducer: {
            contactsList : contactsSlice
        }
    }
)

export default store;
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

