import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useFavicon, useTitle } from 'react-use';
import addressIcon from './icons8-address-book-32.png';

// import { initializeContacts } from '../../redux/actions';
import { initializeContacts } from 'redux/contactsSlice';
// move selector to slice?!!!
// make constamts for action names!
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

  return (
    <Container>
      <Section title="Phonebook">
        <ContactForm />
      </Section>
      <Section title="Contacts">
        {contacts.length ? (
          <>
            <Filter />
            <ContactList />
          </>
        ) : (
          <p>No contacts</p>
        )}
      </Section>
    </Container>
  );
}
