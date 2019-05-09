import React from 'react';

const PlayButton = ({ disabled, click, children }) => {
  return (
    <button className="Play" disabled={disabled} onClick={click}>
      <i className="fas fa-play" />
      {children}
    </button>
  );
};

export default PlayButton;
