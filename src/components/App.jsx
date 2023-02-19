import { useState, useEffect } from 'react';
import { Loader } from './Loader/Loader';
import { requestImages } from 'services/API';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Modal } from './Modal/Modal';
import { Searchbar } from './Searchbar/Searchbar';
import { Button } from './Button/Button';
import css from './App.module.css';

export const App = () => {
  // state = {
  //   query: '',
  //   images: [],
  //   isLoading: false,
  //   error: '',
  //   page: 1,
  //   showModal: false,
  //   largeImage: '',
  //   showLoadMore: false,
  // };

  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [largeImage, setLargeImage] = useState('');
  const [showLoadMore, setShowLoadMore] = useState(false);

  useEffect(() => {
    if (!query) return;
    alert('Images not found');

    const fetchImages = async () => {
      try {
        setIsLoading(true);
        const { hits, totalHits } = await requestImages(query, page);
        // if (totalHits === 0) {
        //   alert('Images not found');
        //   this.setState({ isLoading: false, showLoadMore: false });
        //   return;
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

        setImages(prevImages => [...prevImages, ...images]);
        setShowLoadMore(page < Math.ceil(totalHits / 12));
      } catch (error) {
        console.err(error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, [query, page]);

  // const { page, query } = this.state;
  // if (
  //   prevState.query !== this.state.query ||
  //   prevState.page !== this.state.page
  // ) {
  //   this.setState({ isLoading: true });

  //   try {
  //     const { hits, totalHits } = await requestImages(query, page);
  //     if (totalHits === 0) {
  //       alert('Images not found');
  //       this.setState({ isLoading: false, showLoadMore: false });
  //       return;
  //     }

  //     const images = hits.map(
  //       ({ id, largeImageURL, tags, webformatURL }) => ({
  //         id,
  //         largeImageURL,
  //         tags,
  //         webformatURL,
  //       })
  //     );

  //     console.log(hits.length);
  //     console.log(totalHits);
  //     console.log(page);
  //     console.log(Math.ceil(totalHits / 12));

  //     this.setState(prevState => {
  //       return {
  //         images: [...prevState.images, ...images],
  //         showLoadMore: page < Math.ceil(totalHits / 12),
  //       };
  //     });
  //   } catch (error) {
  //     console.err(error);
  //     this.setState({ error: error.message });
  //   } finally {
  //     this.setState({ isLoading: false });
  //   }
  // }

  const handleLoadMoreImg = () => {
    setPage(prevPage => prevPage + 1);
    // this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  const handleSearchSubmit = query => {
    setQuery(query);
    setPage(1);
    setImages([]);
    setIsLoading(false);
    // this.setState({
    //   images: [],
    //   page: 1,
    //   query: query,
    //   showLoadMore: false,
    // });
  };

  const openModal = largeImage => {
    setLargeImage(largeImage);
    toggleModal();

    // this.setState({ largeImage }, () => {
    //   this.toggleModal();
    // });
  };

  const toggleModal = () => {
    setShowModal(showModal => !showModal);
    // this.setState(({ showModal }) => ({
    //   showModal: !showModal,
    // }));
  };

  // const {
  //   images,
  //   isLoading,
  //   error,
  //   largeImage,
  //   tags,
  //   showLoadMore,
  //   showModal,
  // } = this.state;
  return (
    <div className={css.App}>
      <Searchbar onSubmit={handleSearchSubmit} />
      {images.length > 0 && !error && (
        <>
          <ImageGallery images={images} onClick={openModal} />
        </>
      )}
      {showModal && (
        <Modal onClose={toggleModal}>
          <img src={largeImage} alt={''} />
        </Modal>
      )}
      {showLoadMore && <Button onClick={handleLoadMoreImg} />}
      {isLoading && <Loader />}
    </div>
  );
};
