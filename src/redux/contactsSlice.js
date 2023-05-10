import { createSlice, nanoid } from '@reduxjs/toolkit';
const contactsInitialState = [];
const contactsSlice = createSlice({
  name: 'contacts',
  initialState: contactsInitialState,
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
    initializeContacts: {
      reducer(state, action) {
        return [...state, ...action.payload];
      },
    },
  },
});

export const { addContact, deleteContact, initializeContacts } =
  contactsSlice.actions;
export const contactsReducer = contactsSlice.reducer;
