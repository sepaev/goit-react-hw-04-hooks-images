import { PropTypes } from 'prop-types';
import { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import toastOptions from '../../options/toast';
import {
  SearchBarHeader,
  SearchForm,
  SearchButton,
  SearchButtonSpan,
  SearchInput,
} from './SearchBar.styled';

class SearchBar extends Component {
  state = {
    query: '',
  };

  handleQueryChange = e => {
    this.setState({ query: e.currentTarget.value.toLowerCase() });
  };

  handleSubmit = e => {
    e.preventDefault();
    const query = this.state.query.trim();

    if (!query) {
      toast.error(`Please input search value.`, toastOptions);
      return;
    }
    this.props.onSubmit(query);
    this.setState({ query: '' });
  };

  render() {
    return (
      <SearchBarHeader>
        <SearchForm onSubmit={this.handleSubmit}>
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
            value={this.state.query}
            onChange={this.handleQueryChange}
          />
          <ToastContainer />
        </SearchForm>
      </SearchBarHeader>
    );
  }
}

export default SearchBar;

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
