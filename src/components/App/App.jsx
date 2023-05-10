import { useSelector } from 'react-redux';
import { useFavicon, useTitle } from 'react-use';
import addressIcon from '../../assets/images/icons8-address-book-32.png';
import { getContacts } from 'redux/selectors';

import {
  Container,
  Section,
  ContactForm,
  ContactList,
  Filter,
} from 'components';

export function App() {
  useTitle('Phonebook');
  useFavicon(addressIcon);
  const contacts = useSelector(getContacts);

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
