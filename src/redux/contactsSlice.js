import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialContacts = [
  {
    id: '1',
    name: 'John Doe',
    number: '1234567890',
  },
  {
    id: '2',
    name: 'Jane Smith',
    number: '0987654321',
  },
];

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: initialContacts,
  reducers: {
    addContact: {
      reducer(state, action) {
        state.push(action.payload);
      },
      prepare(name, number) {
        return {
          payload: {
            id: nanoid(),
            number,
            name,
          },
        };
      },
    },
    deleteContact(state, action) {
      const index = state.findIndex(contact => contact.id === action.payload);
      state.splice(index, 1);
    },
  },
});

export const { addContact, deleteContact, initializeContacts } =
  contactsSlice.actions;
export const contactsReducer = contactsSlice.reducer;
