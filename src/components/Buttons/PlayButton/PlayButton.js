import React from 'react';

const PlayButton = ({ disabled, click, children }) => {
  return (
    <button className="Play Small-Text-Bold" disabled={disabled} onClick={click}>
      <i className="fas fa-play" />
      {children}
    </button>
  );
};

export default PlayButton;
