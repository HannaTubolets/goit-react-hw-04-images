import PropTypes from 'prop-types';
import css from './Modal.module.css';
export const Modal = ({ src, alt, handleClose }) => {
  return (
    <div className={css.Overlay} onClick={handleClose}>
      <div className={css.Modal}>
        <img src={src} alt={alt} />
      </div>
    </div>
  );
};
Modal.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  handleClose: PropTypes.func.isRequired,
};
