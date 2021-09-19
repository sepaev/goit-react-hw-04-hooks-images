import { PropTypes } from 'prop-types';
import { InfoDiv } from './Loader.styled';

const Loader = ({ query }) => {
  return <InfoDiv>Searching for a {query}...</InfoDiv>;
};

export default Loader;

Loader.propTypes = {
  query: PropTypes.string.isRequired,
};
