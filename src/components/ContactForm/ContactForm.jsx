import React, { useState } from 'react';
import css from './ContactForm.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { addContact } from 'redux/operations';

export const ContactForm = () => {
  const contacts = useSelector(state => state.contacts.items);
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const isDuplicate = name => {
    const result = contacts?.find(
      contactItem => contactItem.name.toLowerCase() === name.toLowerCase()
    );
    return result;
  };

  const addContactToStore = contactObject => {
    if (isDuplicate(contactObject.name)) {
      return alert(`${contactObject.name} is alredy in contacts`);
    }

    return dispatch(addContact(contactObject));
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
    resetState();
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
      <button type="submit">Add contact</button>
    </form>
  );
};
