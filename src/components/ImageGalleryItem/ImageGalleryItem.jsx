import React from 'react';
import css from './ImageGalleryItem.module.css';

function ImageGalleryItem({ onClick, img }) {
  const { webformatURL, tags, id } = img;
  return (
    <li className={css.ImageGalleryItem}>
      <img
        src={webformatURL}
        alt={tags}
        id={id}
        className={css.image}
        onClick={onClick}
      />
    </li>
  );
}

export default ImageGalleryItem;
