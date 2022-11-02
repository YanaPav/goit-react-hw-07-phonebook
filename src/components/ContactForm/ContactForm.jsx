import React, { useEffect, useState } from 'react';
import css from './ContactForm.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { addContact } from 'redux/operations';

export const ContactForm = () => {
  const contacts = useSelector(state => state.contacts.items);
  const isLoading = useSelector(state => state.contacts.isLoading);
  const error = useSelector(state => state.contacts.error);
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const isDuplicate = name => {
    const result = contacts?.find(
      contactItem => contactItem.name.toLowerCase() === name.toLowerCase()
    );
    return result;
  };

  useEffect(() => {
    error?.type === 'add' && Notify.failure(`${error.message}`);
  }, [error]);

  const addContactToStore = contactObject => {
    if (isDuplicate(contactObject.name)) {
      Notify.warning(`${contactObject.name} is alredy in contacts`);
      return;
    }

    dispatch(addContact(contactObject));
    resetState();
  };

  const handleChange = e => {
    const { name, value } = e.target;

    if (name === 'name') setName(value);
    if (name === 'phone') setPhone(value);
  };

  const handleSubmit = e => {
    e.preventDefault();

    const contactObj = {
      name,
      phone,
    };

    addContactToStore(contactObj);
  };

  const resetState = () => {
    setName('');
    setPhone('');
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <label>
        Name
        <input
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          value={name}
          onChange={handleChange}
        />
      </label>
      <label>
        Number
        <input
          type="tel"
          name="phone"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          value={phone}
          onChange={handleChange}
        />
      </label>
      <button type="submit" disabled={isLoading === 'add'}>
        {isLoading === 'add' ? 'Adding...' : 'Add contact'}
      </button>
    </form>
  );
};
