import { PropTypes } from 'prop-types';
import { Component } from 'react';
import { OverlayDiv, ModalDiv, ModalImg } from './Modal.styled';

class Modal extends Component {
  onTapped = e => {
    const { prev, next } = this.props.modalNeighbors;
    e.preventDefault();
    if (e.key === 'Escape') this.props.exitFunc();
    if (e.key === 'ArrowLeft') this.props.changeNeighbors(prev.id);
    if (e.key === 'ArrowRight') this.props.changeNeighbors(next.id);
  };
  componentDidMount() {
    window.addEventListener('keydown', this.onTapped);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.onTapped);
  }
  onClickModal = e => {
    if (e.target.nodeName === 'DIV') this.props.exitFunc();
  };
  render() {
    const { curr } = this.props.modalNeighbors;
    return (
      <OverlayDiv onClick={this.onClickModal}>
        <ModalDiv>
          <ModalImg src={curr.largeImageURL} alt={curr.tags} loading='lazy' />
        </ModalDiv>
      </OverlayDiv>
    );
  }
}

export default Modal;

Modal.propTypes = {
  modalNeighbors: PropTypes.exact({
    curr: PropTypes.object.isRequired,
    prev: PropTypes.object.isRequired,
    next: PropTypes.object.isRequired,
  }),
  exitFunc: PropTypes.func.isRequired,
};
