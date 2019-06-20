import React from 'react';

import './ButtonsBottom.css';

const ButtonsBottom = ({ click, newClass, children, selected = false }) => {
  return (
    <article
      className={`buttonsSidebar buttonsBottom ${selected ? 'selected' : ''}`}
      onClick={click}
    >
      <article className={newClass} />
      <h1 className="Small-Text-Regular">{children}</h1>
    </article>
  );
};

export default ButtonsBottom;
