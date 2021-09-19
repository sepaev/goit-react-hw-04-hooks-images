import { PropTypes } from 'prop-types';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import toastOptions from '../../options/toast';
import { SearchBarHeader, SearchForm, SearchButton, SearchButtonSpan, SearchInput } from './SearchBar.styled';

function SearchBar({ onSubmit }) {
  const [query, setQuery] = useState('');

  function handleQueryChange(e) {
    const value = e.currentTarget.value.toLowerCase();
    setQuery(value.trim());
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!query) {
      toast.error(`Please input search value.`, toastOptions);
      return;
    }
    onSubmit(query);
    setQuery('');
  }

  return (
    <SearchBarHeader>
      <SearchForm onSubmit={handleSubmit}>
        <SearchButton type='submit'>
          <SearchButtonSpan>Search</SearchButtonSpan>
        </SearchButton>

        <SearchInput
          className='SearchForm-input'
          type='text'
          autocomplete='off'
          name='pictureName'
          autoFocus
          placeholder='Search images and photos'
          value={query}
          onChange={handleQueryChange}
        />
        <ToastContainer />
      </SearchForm>
    </SearchBarHeader>
  );
}

export default SearchBar;

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
