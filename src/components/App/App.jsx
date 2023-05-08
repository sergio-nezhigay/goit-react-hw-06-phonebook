import { useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useFavicon, useTitle } from 'react-use';
import addressIcon from './address-book.ico';

import {
  initializeContacts,
  addContact,
  setFilter,
  deleteContact,
} from '../../redux/actions';

import {
  Container,
  Section,
  ContactForm,
  ContactList,
  Filter,
} from 'components';

const MY_CONTACTS = 'contacts';

export function App() {
  useTitle('Phonebook');
  useFavicon(addressIcon);
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contacts);
  const filter = useSelector(state => state.filter);
  useEffect(() => {
    try {
      const contactsStorage = JSON.parse(localStorage.getItem(MY_CONTACTS));
      if (contactsStorage) {
        dispatch(initializeContacts(contactsStorage));
      }
    } catch (error) {
      console.log(`Error accessing localStorage: ${error}`);
    }
  }, [dispatch]);

  useEffect(() => {
    // try /catch are for localStorage errors
    try {
      localStorage.setItem(MY_CONTACTS, JSON.stringify(contacts));
    } catch (error) {
      console.log(`Error accessing localStorage: ${error}`);
    }
  }, [contacts]);

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
    dispatch(setFilter(''));
    resetForm();
  };

  const onChangeFilter = e => {
    dispatch(setFilter(e.target.value));
  };

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
    <Container>
      <Section title="Phonebook">
        <ContactForm onSubmit={onSubmit} />
      </Section>
      <Section title="Contacts">
        {contacts.length ? (
          <>
            <Filter filter={filter} onChange={onChangeFilter} />
            <ContactList
              contacts={filteredAndMemoedcontacts}
              onDelete={onDelete}
            />
          </>
        ) : (
          <p>No contacts</p>
        )}
      </Section>
    </Container>
  );
}
