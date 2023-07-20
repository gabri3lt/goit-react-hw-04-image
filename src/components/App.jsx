import React, { useState, useEffect } from 'react';
import css from './App.module.css';
import Searchbar from 'components/SearchBar/SearchBar';
import ImageGallery from 'components/ImageGallery/ImageGallery';
import Button from 'components/Button/Button';
import Loader from 'components/Loader/Loader';
import Modal from 'components/Modal/Modal';
import { fetchMovies } from './API/Api';
import { ToastContainer, toast } from 'react-toastify';

const App = () => {
  const [image, setImage] = useState([]);
  const [searchImage, setSearchImage] = useState(null);
  const [page, setPage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [largeImage, setLargeImage] = useState('');

  useEffect(() => {
    if (searchImage !== null || page !== null) {
      setLoading(true);

      fetchMovies(searchImage, page)
        .then(data => {
          setImage(prevImage => [...prevImage, ...data.hits]);
          window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth',
          });
        })
        .catch(error => setError(error))
        .finally(() => setLoading(false));
    }
  }, [searchImage, page]);

  const onClickLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const modalShow = index => {
    setShowModal(true);
    setLargeImage(image[index].largeImageURL);
  };

  const modalHide = () => {
    setShowModal(false);
  };

  const onFormSubmit = img => {
    setSearchImage(img);
    setPage(1);
    setImage([]);
  };

  const notify = () => {
    toast.error('🦄 Wow so easy!', {
      position: 'top-right',
      autoClose: false,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <div className={css.App}>
      <Searchbar onSubmit={onFormSubmit} />
      <ImageGallery searchQuery={image} onClick={modalShow} />

      {image.length !== 0 && (
        <Button text="Load more" onClick={onClickLoadMore} />
      )}

      {error ? notify() : null}
      {loading && <Loader />}
      {showModal && <Modal onClose={modalHide} img={largeImage} />}

      <ToastContainer
        position="top-right"
        autoClose={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
      />
    </div>
  );
};

export default App;
