import { Component } from 'react';
import { Loader } from './Loader/Loader';
import { requestImages } from 'services/API';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Modal } from './Modal/Modal';
import { Searchbar } from './Searchbar/Searchbar';
import { Button } from './Button/Button';
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
    showLoadMore: false,
  };

  async componentDidUpdate(_, prevState) {
    const { page, query } = this.state;

    if (
      prevState.query !== this.state.query ||
      prevState.page !== this.state.page
    ) {
      this.setState({ isLoading: true });

      try {
        const { hits, totalHits } = await requestImages(query, page);
        if (totalHits === 0) {
          alert('Images not found');
          this.setState({ isLoading: false, showLoadMore: false });
          return;
        }

        const images = hits.map(
          ({ id, largeImageURL, tags, webformatURL }) => ({
            id,
            largeImageURL,
            tags,
            webformatURL,
          })
        );

        console.log(hits.length);
        console.log(totalHits);
        console.log(page);
        console.log(Math.ceil(totalHits / 12));

        this.setState(prevState => {
          return {
            images: [...prevState.images, ...images],
            showLoadMore: page < Math.ceil(totalHits / 12),
          };
        });
      } catch (error) {
        console.err(error);
        this.setState({ error: error.message });
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  handleLoadMoreImg = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  handleSearchSubmit = query => {
    this.setState({
      images: [],
      page: 1,
      query: query,
      showLoadMore: false,
    });
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
      isLoading,
      error,
      largeImage,
      tags,
      showLoadMore,
      showModal,
    } = this.state;
    return (
      <div className={css.App}>
        <Searchbar onSubmit={this.handleSearchSubmit} />
        {images.length > 0 && !error && (
          <>
            <ImageGallery images={images} onClick={this.openModal} />
          </>
        )}
        {showModal && (
          <Modal onClose={this.toggleModal}>
            <img src={largeImage} alt={tags} />
          </Modal>
        )}
        {showLoadMore && <Button onClick={this.handleLoadMoreImg} />}
        {isLoading && <Loader />}
      </div>
    );
  }
}
