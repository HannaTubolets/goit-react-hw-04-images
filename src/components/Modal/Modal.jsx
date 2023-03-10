import PropTypes from 'prop-types';
import { useEffect } from 'react';
import css from './Modal.module.css';

export const Modal = ({ onClose, children }) => {
  useEffect(() => {
    
    const handleKeyDown = e => {
    if (e.code === 'Escape') {
      onClose();
    }
  };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  },[onClose]);

  
  const handleOverlayClick = event => {
    if (event.currentTarget === event.target) {
      onClose();
    }
  };

  return (
    <div className={css.Overlay} onClick={handleOverlayClick}>
      <div className={css.Modal}>{children}</div>
    </div>
  );
};

Modal.propTypes = {
  children: PropTypes.node.isRequired,
};
