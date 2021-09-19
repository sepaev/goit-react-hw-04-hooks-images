import { PropTypes } from 'prop-types';
import { LoadMoreButton } from './Button.styled';

function Button({ title, onClick }) {
  return <LoadMoreButton onClick={onClick}>{title}</LoadMoreButton>;
}

export default Button;

Button.propTypes = {
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
