import React from 'react';

import './SecondaryButton.css';

const SecondaryButton = ({ children, onClick, enabled = true }) => {
  const modifierClass = enabled ? 'enabled' : 'disabled';
  const classes = `SecondaryButton ${modifierClass}`;
  return (
    <div className={classes} onClick={enabled ? onClick : null}>
      {children}
    </div>
  );
};

export default SecondaryButton;
