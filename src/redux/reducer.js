import { createReducer } from '@reduxjs/toolkit';
import {
  initializeContacts,
  addContact,
  deleteContact,
  setFilter,
} from './actions';

const contactsInitialState = [
  // { id: 'id-1', name: 'Rosie 1Simpsonna', number: '459-12-56' },
  // { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  // { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  // { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];

const filterInitialState = '';

export const contactsReducer = createReducer(contactsInitialState, {
  [addContact]: (state, action) => {
    return [...state, action.payload];
  },
  [deleteContact]: (state, action) => {
    return state.filter(contact => contact.id !== action.payload);
  },
  [initializeContacts]: (state, action) => {
    return [...state, ...action.payload];
  },
});

export const filterReducer = createReducer(filterInitialState, {
  [setFilter]: (state, action) => {
    return action.payload;
  },
});
