import { Component } from 'react';
import { requestImages, PER_PAGE } from 'services/API';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Modal } from './Modal/Modal';
import { Searchbar } from './Searchbar/Searchbar';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';

import css from './App.module.css';

export class App extends Component {
  state = {
    query: '',
    images: [],
    isLoading: false,
    error: '',
    page: 1,
    showModal: false,
    largeImage: '',
    currentImgPerPage: null,
  };

  componentDidUpdate(_, prevState) {
    const prevQuery = prevState.query;
    const nextQuery = this.state.query;
    if (prevQuery !== nextQuery) {
      this.fetchImages();
    }
  }

  fetchImages = async () => {
    const { page, query } = this.state;

    try {
      this.setState({ isLoading: true });
      const { hits, totalHits } = await requestImages(page, query);
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
      console.log(error);
      this.setState({ error: error.message });
    } finally {
      this.setState({ isLoading: false });
    }
    // const data = await requestImages(query, page);
    // const hits = data.hits;
    // const total = data.total;

    // if (total === 0) {
    //   alert('No images found');
    //   return;
    // }
    // if (total > 0 && page === 1) {
    //   alert(`${total}images found`);
    // }
    // if (page > 1 && page * 12 < total) {
    //   alert('Here are 12 more images');
    // }
    // if (total - page * 12 < total <= 0) {
    //   alert('There are no more images');
    // }
    // this.setState({ images: hits, total });
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

  handleLoadMoreImg = () => {
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
    const {
      images,
      loading,
      error,
      largeImage,
      tags,
      currentImgPerPage,
      showModal,
    } = this.state;
    return (
      <div className={css.App}>
        <Searchbar onSubmit={this.handleSearchSubmit} />
        {images.length > 0 && !error && (
          <>
            <ImageGallery images={images} onClick={this.openModal} />
            {currentImgPerPage && currentImgPerPage < PER_PAGE && (
              <p className={css.Message}>There are no more pictures</p>
            )}
          </>
        )}
        {showModal && (
          <Modal onClose={this.toggleModal}>
            <img src={largeImage} alt={tags} />
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
