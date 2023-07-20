import React from 'react';
import css from './Loader.module.css';

const Loader = () => {
  return (
    <div className={css.loader}>
      <div data-glitch="Loading..." className={css.glitch}>
        Loading...
      </div>
    </div>
  );
};

export default Loader;
