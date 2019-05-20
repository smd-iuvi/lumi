import React from 'react';

import './ButtonsBottom.css';

const ButtonsBottom = ({ icon, children, click }) => {
  return (
    <article className="buttonsSidebar buttonsBottom" onClick={click}>
      <img src={icon} className="iconBottom" />
      <h1 className="labelBottom">{children}</h1>
    </article>
  );
};

export default ButtonsBottom;
