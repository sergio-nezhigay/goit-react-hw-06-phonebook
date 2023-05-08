import { nanoid } from 'nanoid';

export const initializeContacts = contacts => {
  return {
    type: 'contacts/initialize',
    payload: contacts,
  };
};

export const addContact = (name, number) => {
  return {
    type: 'contacts/addContact',
    payload: {
      id: nanoid(),
      number,
      name,
    },
  };
};

export const deleteContact = contactId => {
  return {
    type: 'contacts/deleteContact',
    payload: contactId,
  };
};

export const setFilter = text => {
  return {
    type: 'filter/setFilter',
    payload: text,
  };
};
