import React, { Component } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import { MainWrapper } from './App.styled';


export class App extends Component {
  state = {
    contacts: [],
    filter: '',

  }


  componentDidMount() {
   const stringifiedContacts = localStorage.getItem('contacts');
    const contacts = JSON.parse(stringifiedContacts) ?? [];

    this.setState({ contacts });
}

  componentDidUpdate(_, prevState) {
    if (prevState.contacts.length !== this.state.contacts.length) {
      const stringifiedContacts = JSON.stringify(this.state.contacts);
      localStorage.setItem('contacts', stringifiedContacts)

    }
  }

  onAddContact = data => {
    const isContact = this.state.contacts.some(
      contact => contact.name.toLowerCase() === data.name.toLowerCase()
    );

    if (isContact) {
      return alert(`${data.name} is already in contact`);
    }
    this.setState(({ contacts }) => ({
      contacts: [data, ...contacts],
    }));
  }

  onRemoveContact = contactId => {
    this.setState ({
      contacts: this.state.contacts.filter(contact => contact.id !== contactId)
    })
  }

  onFilterByName = event => {
  this.setState({ filter: event.target.value });
  }

  render() {
    const { filter, contacts } = this.state;
    const filterContact = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
    return (
      <MainWrapper>
        <h1>Phonebook</h1>
        <ContactForm onAddContact={this.onAddContact}/>

        <h2>Contacts</h2>
        <Filter onFilterChange={this.onFilterByName} filter={this.state.filter}/>
        
        {this.state.contacts.length > 0 && (<ContactList onRemoveContact={this.onRemoveContact} contacts={filterContact} />)}
        
      </MainWrapper>
    )
  }
}