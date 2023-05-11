import React, { useId } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, ErrorMessage } from 'formik';
import { object, string } from 'yup';

import { addContact } from 'redux/contactsSlice';
import { getContacts } from 'redux/selectors';

import {
  StyledForm,
  Label,
  StyledField,
  ErrorStyledMessage,
  Button,
} from './ContactForm.styled';

const numberRegex =
  /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/;
const nameRegex = /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/;
const numberMessage = `Phone number must be digits and can contain spaces, dashes, parentheses and can start with +`;
const nameMessage = `Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan`;

let schema = object({
  name: string()
    .matches(nameRegex, {
      message: nameMessage,
      excludeEmptyString: true,
    })
    .required(),
  number: string()
    .matches(numberRegex, {
      message: numberMessage,
      excludeEmptyString: true,
    })
    .required(),
});

export function ContactForm() {
  const dispatch = useDispatch();
  const id = useId().replace(/:/g, '');

  const contacts = useSelector(getContacts);

  const onSubmit = ({ name, number }, { resetForm }) => {
    if (
      contacts.some(contact =>
        contact.name.toLowerCase().includes(name.toLowerCase())
      )
    ) {
      alert(`${name} is already in contacts.`);
      return;
    }
    dispatch(addContact(name, number));
    resetForm();
  };

  return (
    <Formik
      initialValues={{ name: '', number: '' }}
      validationSchema={schema}
      onSubmit={onSubmit}
    >
      <StyledForm>
        <Label htmlFor={'name_' + id}>Name</Label>
        <StyledField
          type="text"
          name="name"
          placeholder="Enter the name"
          id={'name_' + id}
        />
        <ErrorMessage component={ErrorStyledMessage} name="name" />
        <Label htmlFor={'number_' + id}>Number</Label>
        <StyledField
          type="tel"
          name="number"
          placeholder="Enter the number"
          id={'number_' + id}
        />
        <ErrorMessage component={ErrorStyledMessage} name="number" />
        <Button type="submit">Add Contact</Button>
      </StyledForm>
    </Formik>
  );
}
