import { Component } from 'react';
import { requestImages, PER_PAGE } from 'services/API';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Searchbar } from './Searchbar/Searchbar';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import css from './App.module.css';

export class App extends Component {
  state = {
    query: '',
    images: [],
    totalImages: 0,
    isLoading: false,
    error: '',
    page: 1,
    showLoadMore: false,
  };

  componentDidUpdate(_, prevState) {
    const prevQuery = prevState.query;
    const nextQuery = this.state.query;
    if (prevQuery !== nextQuery) {
      this.fetchImages();
    }
    if (this.setState.page > 2) {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
    }
  }

  fetchImages = async () => {
    try {
      this.setState({ isLoading: true });
      const { hits, totalHits } = await requestImages(
        this.state.page,
        this.state.query
      );
      if (totalHits === 0) {
        alert('Images not found ...');
        this.setState({ loading: false, currentImgPerPage: null });
        return;
      }

      const images = this.imagesArray(hits);
      this.setState(prevState => {
        return {
          images: [...prevState.images, ...images],
          currentImgPerPage: hits.length,
          page: prevState.page + 1,
        };
      });
    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  imagesArray = data => {
    return data.map(({ id, largeImageURL, tags, webformatURL }) => {
      return { id, largeImageURL, tags, webformatURL };
    });
  };

  handleSearchSubmit = query => {
    this.setState(() => {
      return { query: query, page: 1, images: [] };
    });
  };

  handleLoadMorImg = () => {
    this.fetchImages();
  };

  openModal = largeImage => {
    this.setState({ largeImage }, () => {
      this.toggleModal();
    });
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    const { images, loading, currentImgPerPage, error, showModal, largeImage } =
      this.state;
    return (
      <div className={css.App}>
        <Searchbar onSubmit={this.handleSearchSubmit} />
        {images.length > 0 && !error && (
          <>
            <ImageGallery images={images} onClick={this.openModal} />
            {currentImgPerPage && currentImgPerPage < PER_PAGE && (
              <p className={css.Message}>No more pictures</p>
            )}
          </>
        )}
        {showModal && (
          <Modal onClose={this.toggleModal}>
            <img src={largeImage} alt="" />
          </Modal>
        )}
        {currentImgPerPage === PER_PAGE && !loading && (
          <Button onClick={this.handleLoadMoreImg} />
        )}
        {loading && <Loader />}
      </div>
    );
  }
}
