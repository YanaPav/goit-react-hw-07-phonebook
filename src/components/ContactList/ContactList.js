import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import CircularProgress from '@mui/material/CircularProgress';
import { fetchContacts } from 'redux/operations'
import { ContactItem } from '../ContactItem/ContactItem'
import css from './ContactList.module.css';

export const ContactList = () => {
    const contacts = useSelector(state => state.contacts.items);
    const isLoading = useSelector(state => state.contacts.isLoading);       
    const error = useSelector(state => state.contacts.error);       

    const filterValue = useSelector(state => state.filter);
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchContacts())
    }, [dispatch])   

    const filtredContacts = contacts?.filter(({ name }) =>
    name.toLowerCase().includes(filterValue.toLowerCase())
    );
    
    return (
        <>
            {isLoading === 'fetch' && <CircularProgress />}
            
            {error?.type === 'fetch' && <div>{error.message}</div>}        
            {contacts && <ul className={css.contactsList}>
                {filtredContacts?.map(({ name, phone, id }) => {
                    return <ContactItem key={id} name={name} number={phone} id={id} />
                })}
            </ul>}
        </>
    )
}

