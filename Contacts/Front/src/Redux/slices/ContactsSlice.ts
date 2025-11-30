import axios from "axios";
import type { contact } from "../../Types";
import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";



interface ContactsState {
    list: contact[];
    loading: 'idle' | 'pending' | 'succeeded' | 'failed';
    error: string | null;
}

// مقدار اولیه (Initial State)
const initialState: ContactsState = {
    list: [],
    loading: 'idle', // وضعیت اولیه
    error: null,
};

// --- ۱. تعریف Thunk آسنکرون برای دریافت داده ---
// 'contacts/fetchContacts' نام اکشن است
export const fetchContacts = createAsyncThunk<contact[], void>(
    'contacts/fetchContacts',
    async (_, { rejectWithValue }) => {
        try {

            const response = await axios.get<contact[]>('http://localhost:5141/contacts/getallcontacts');
            
            console.log(response)
            
            return response.data;
        } catch (error) {
            let errorMessage = "Failed to fetch contacts";
            if (axios.isAxiosError(error) && error.message) {
                errorMessage = error.message;
            }
  
            return rejectWithValue(errorMessage);
        }
    }
);
//


const contactsSlice = createSlice(
    {
        name : "Contacts",
        initialState : initialState,
        reducers: {
            addContacts(state,action : PayloadAction<contact>){
                state.list.push(action.payload)

            },
            updateContacts(state,action:PayloadAction<contact>){
                const modifycontact = state.list.find((item)=>item.id == action.payload.id)

                if(modifycontact){
                    modifycontact.fullname = action.payload.fullname;
                    modifycontact.phon_number = action.payload.phon_number;
                    modifycontact.imgadress = action.payload.imgadress;
                    modifycontact.birthday = action.payload.birthday;
                }
            }
            ,
            removeContat(state , action : PayloadAction<string>){
                const index = state.list.findIndex(item=>item.id == action.payload)
                state.list.splice(index,1)

            }
        }
        ,extraReducers: (builder) => {

            builder.addCase(fetchContacts.pending, (state) => {
                state.loading = 'pending';
                state.error = null;
            });

            builder.addCase(fetchContacts.fulfilled, (state, action) => {
                state.loading = 'succeeded';
                state.list = action.payload; 
                state.error = null;
            });

            builder.addCase(fetchContacts.rejected, (state, action) => {
                state.loading = 'failed';

                state.error = (action.payload as string) || action.error.message || 'An unknown error occurred';
                state.list = [];
            });
        }
    }
)

export default contactsSlice.reducer;
export const contactsActions = contactsSlice.actions;