import { useState, useEffect } from 'react';
import { Loader } from './Loader/Loader';
import { requestImages } from 'services/API';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Modal } from './Modal/Modal';
import { Searchbar } from './Searchbar/Searchbar';
import { Button } from './Button/Button';
import css from './App.module.css';

export const App = () => {
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

    const fetchImages = async () => {
      try {
        setIsLoading(true);
        const { hits, totalHits } = await requestImages(query, page);
        if (totalHits === 0) {
          alert('Images not found');
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

  const handleLoadMoreImg = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handleSearchSubmit = query => {
    setQuery(query);
    setPage(1);
    setImages([]);
    setIsLoading(false);
  };

  const openModal = largeImage => {
    setLargeImage(largeImage);
    toggleModal();
  };

  const toggleModal = () => {
    setShowModal(showModal => !showModal);
  };

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
