import React from 'react';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';

const ImageGallery = ({ searchQuery, onClick }) => {
  return (
    <ul className={css.ImageGallery}>
      {searchQuery &&
        searchQuery.map((img, i) => (
          <ImageGalleryItem key={img.id} img={img} onClick={() => onClick(i)} />
        ))}
    </ul>
  );
};

export default ImageGallery;
