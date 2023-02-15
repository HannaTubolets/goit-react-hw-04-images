import PropTypes from 'prop-types';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';

export const ImageGallery = ({ images, onImageClick }) => {
  return (
    <div>
      <ul className={css.gallery}>
        {images.map(({ id, largeImageURL, tags, webformatURL }) => {
          return (
            <ImageGalleryItem
              key={id}
              largeImage={largeImageURL}
              tags={tags}
              preview={webformatURL}
              onClick={onImageClick}
            />
          );
        })}
      </ul>
    </div>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      tags: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      webformatURL: PropTypes.string.isRequired,
    })
  ).isRequired,
  onImageClick: PropTypes.func,
};
