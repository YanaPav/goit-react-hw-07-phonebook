import { createSlice } from "@reduxjs/toolkit";
import { fetchContacts, deleteContact, addContact} from "./operations";



const contactsSlice = createSlice({
    name: 'contacts',
    initialState: {       
        items: [],
        isLoading: false,
        error: null        
    },

    extraReducers: {
        [fetchContacts.pending](state) {            
            state.isLoading = true
        },
        [fetchContacts.fulfilled](state, { payload }) {
            state.isLoading = false
            state.error = null
            state.items = payload
        },
        [fetchContacts.rejected](state, { payload }) {
            state.isLoading = false
            state.error = payload
        },

        
        [deleteContact.pending](state) {            
            state.isLoading = true
        },
        [deleteContact.fulfilled](state, { payload }) {
            state.isLoading = false
            state.error = null
            state.items = state.items.filter(item => item.id !== payload.id )                        
        },
        [deleteContact.rejected](state, { payload }) {
            state.isLoading = false
            state.error = payload
        },
        

        [addContact.pending](state) {            
            state.isLoading = true
        },
        [addContact.fulfilled](state, { payload }) {
            state.isLoading = false
            state.error = null
            state.items.push(payload)                        
        },
        [addContact.rejected](state, { payload }) {
            state.isLoading = false
            state.error = payload
        }
     }
    
})

export const contactsReducer = contactsSlice.reducer;