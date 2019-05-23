import React from 'react';

import './ButtonsBottom.css';


const ButtonsBottom = ({ click, newClass, children }) => {
  return (
    <article className="buttonsSidebar buttonsBottom">
      <article className={newClass} ></article>
      <h1 className="labelBottom">{children}</h1>
    </article>
  );
};

export default ButtonsBottom;
