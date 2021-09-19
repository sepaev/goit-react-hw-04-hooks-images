import { PropTypes } from 'prop-types';
import { ImageGalleryItemImg, ImageGalleryItemLi } from './ImageGalleryItem.styled';

const ImageGalleryItem = ({ id, src, alt, onClick }) => {
  return (
    <ImageGalleryItemLi>
      <ImageGalleryItemImg src={src} alt={alt} id={id} loading='lazy' onClick={onClick} />
    </ImageGalleryItemLi>
  );
};

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  id: PropTypes.number.isRequired,
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
