import { Component } from 'react';
import PropTypes from 'prop-types';
import css from './Searchbar.module.css';

export class Searchbar extends Component {
  state = { query: '' };
  handleChange = event => {
    this.setState({ query: event.currentTarget.value.toLowerCase().trim() });
  };
  handleSubmit = event => {
    event.preventDefaul();
    const { query } = this.state;
    const { onSubmit } = this.props;

    if (query === '') {
      alert('Enter what you find please');
      return;
    }

    onSubmit(query);
    this.setState({ query: '' });
  };
  render() {
    return (
      <header className={css.searchbar}>
        <form className={css.searchForm} onChange={this.handleChange}>
          <input
            className={css.searchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
          <button type="submit" className={css.searchFormBtn}>
            <span className={css.searchFormBtnLabel}>Search</span>
          </button>
        </form>
      </header>
    );
  }
}
Searchbar.propTypes = {
  onSubmit: PropTypes.func,
};
