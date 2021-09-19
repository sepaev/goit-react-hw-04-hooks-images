import { PropTypes } from 'prop-types';
import { useEffect } from 'react';
import { OverlayDiv, ModalDiv, ModalImg } from './Modal.styled';

function Modal({ modalNeighborImages, exitFunc, changeNeighborImages }) {
  const { curr, prev, next } = modalNeighborImages;
  function onTapped(e) {
    e.preventDefault();
    if (e.key === 'Escape') exitFunc();
    if (e.key === 'ArrowLeft') changeNeighborImages(prev.id);
    if (e.key === 'ArrowRight') changeNeighborImages(next.id);
  }
  useEffect(() => {
    window.addEventListener('keydown', onTapped);

    return function cleanup() {
      window.removeEventListener('keydown', onTapped);
    };
  });

  function onClickModal(e) {
    if (e.target.nodeName === 'DIV') exitFunc();
  }

  return (
    <OverlayDiv onClick={onClickModal}>
      <ModalDiv>
        <ModalImg src={curr.largeImageURL} alt={curr.tags} loading='lazy' />
      </ModalDiv>
    </OverlayDiv>
  );
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
