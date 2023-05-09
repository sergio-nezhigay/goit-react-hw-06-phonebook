import React from 'react';
import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { deleteContact } from '../../redux/actions';

import { List, Li, DeleteButton, Text } from './ContactList.styled';

export function ContactList() {
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contacts);
  const filter = useSelector(state => state.filter);
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
