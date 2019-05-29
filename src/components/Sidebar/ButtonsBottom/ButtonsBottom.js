import React from 'react';

import './ButtonsBottom.css';

const ButtonsBottom = ({ click, newClass, children }) => {
  return (
    <article className="buttonsSidebar buttonsBottom" onClick={click}>
      <article className={newClass} />
      <h1 className="Small-Text-Regular">{children}</h1>
    </article>
  );
};

export default ButtonsBottom;
