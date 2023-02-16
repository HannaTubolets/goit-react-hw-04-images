import { RotatingSquare } from 'react-loader-spinner';
import css from './Loader.module.css';

export const Loader = () => {
  <div className={css.Loader}>
    <RotatingSquare
      height="100"
      width="100"
      color="#0375f8"
      ariaLabel="rotating-square-loading"
      strokeWidth="4"
      visible={true}
    />
  </div>;
};
