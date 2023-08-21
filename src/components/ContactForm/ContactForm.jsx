import { useState } from 'react';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';
import {
  ContactButton,
  FormWrapper,
  LabelWrapper,
} from './ContactForm.styled.js';

export const ContactForm = ({ onAddContact }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const onInputChangeName = e => {
    setName(e.target.value);
  };

  const onInputChangeNumber = e => {
    setNumber(e.target.value);
  };

  const onSubmit = e => {
    e.preventDefault();

    const contact = {
      id: nanoid(),
      name,
      number,
    };
    onAddContact(contact);
    reset();
  };

  const reset = () => {
    setName('');
    setNumber('');
  };

  return (
    <>
      <FormWrapper onSubmit={onSubmit}>
        <LabelWrapper>
          <span>Name</span>
          <input
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash, and spaces. For example: Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            value={name}
            onChange={onInputChangeName}
          />
        </LabelWrapper>
        <LabelWrapper>
          <span>Number</span>
          <input
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[\-.\s]?\(?\d{1,3}?\)?[\-.\s]?\d{1,4}[\-.\s]?\d{1,4}[\-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            value={number}
            onChange={onInputChangeNumber}
          />
        </LabelWrapper>

        <ContactButton type="submit">Add contact</ContactButton>
      </FormWrapper>
    </>
  );
};

ContactForm.propTypes = {
  onAddContact: PropTypes.func.isRequired,
};
