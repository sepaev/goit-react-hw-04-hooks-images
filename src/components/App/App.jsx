import { useState, useCallback } from 'react';
import SearchBar from '../SearchBar';
import ImageGallery from '../ImageGallery';
import Loader from '../Loader/Loader';
import { AppSection, InfoDiv, InfoH1 } from './App.styled';
import { toast } from 'react-toastify';
import toastOptions from '../../options/toast';

function App() {
  const [status, setStatus] = useState('idle');
  const [query, setQuery] = useState('');
  const [lastMessage, setLastMessage] = useState('');

  function handleFormSubmit(query) {
    setStatus('resolved');
    setQuery(query);
  }

  const changeStatus = useCallback(
    (newStatus, message = '') => {
      // alert(newStatus);
      if (message && message !== lastMessage) {
        toast.info(message, toastOptions);
        setLastMessage(message);
      }
      setStatus(newStatus);
    },
    [lastMessage],
  );

  return (
    <AppSection>
      <SearchBar onSubmit={handleFormSubmit} />
      {status === 'idle' && (
        <InfoDiv>
          {query && <InfoH1>Sorry, {query} not found</InfoH1>}
          Waiting for you to start new searching
        </InfoDiv>
      )}
      <ImageGallery newQuery={query} changeStatus={changeStatus} />
      {status === 'rejected' && <InfoDiv>{lastMessage}</InfoDiv>}
      {status === 'pending' && <Loader query={query} />}
    </AppSection>
  );
}

export default App;
