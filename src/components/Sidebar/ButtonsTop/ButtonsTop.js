import React from 'react';

import './ButtonsTop.css';

const ButtonsTop = ({ newClass, selected = false, children }) => {
  console.log(selected);
  return (
    <article className={`buttonsSidebar ${selected ? 'selected' : ''}`}>
      <article className={newClass} />
      <h1 className="labelButtons Medium-Text-Bold">{children}</h1>
    </article>
  );
};

export default ButtonsTop;
