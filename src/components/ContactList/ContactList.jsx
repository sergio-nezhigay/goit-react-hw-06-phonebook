import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { deleteContact } from 'redux/contactsSlice';
import { getContacts, getFilter } from 'redux/selectors';
import { List, Li, DeleteButton, Text } from './ContactList.styled';

export function ContactList() {
  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilter);
  const onDelete = id => {
    dispatch(deleteContact(id));
  };

  const filteredAndMemoedcontacts = useMemo(
    () =>
      contacts.filter(contact =>
        contact.name.toLowerCase().includes(filter.toLowerCase())
      ),
    [contacts, filter]
  );

  return (
    <List>
      {filteredAndMemoedcontacts.map(({ id, number, name }) => {
        return (
          <Li key={id}>
            <Text>
              {name}: {number}
            </Text>
            <DeleteButton onClick={() => onDelete(id)} type="button">
              Delete
            </DeleteButton>
          </Li>
        );
      })}
    </List>
  );
}

export default ContactList;
