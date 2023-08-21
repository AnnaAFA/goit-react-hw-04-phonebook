import { useEffect, useState } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import { MainWrapper } from './App.styled';

export const App = () => {
  const [contacts, setContacts] = useState(() => {
    return JSON.parse(window.localStorage.getItem('contacts')) ?? [];
  });
  const [filter, setFilter] = useState('');

  // useEffect(() => {
  //   setContacts(contacts);
  // }, [contacts]);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const onAddContact = data => {
    const isContact = contacts.some(
      contact => contact.name.toLowerCase() === data.name.toLowerCase()
    );

    if (isContact) {
      return alert(`${data.name} is already in contact`);
    }
    setContacts(prevContacts => [data, ...prevContacts]);
  };

  const onRemoveContact = contactId => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== contactId)
    );
  };

  const onFilterByName = event => {
    setFilter(event.target.value);
  };

  const filterContact = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <MainWrapper>
      <h1>Phonebook</h1>
      <ContactForm onAddContact={onAddContact} />

      <h2>Contacts</h2>
      <Filter onFilterChange={onFilterByName} filter={filter} />

      {contacts.length > 0 && (
        <ContactList
          onRemoveContact={onRemoveContact}
          contacts={filterContact}
        />
      )}
    </MainWrapper>
  );
};
