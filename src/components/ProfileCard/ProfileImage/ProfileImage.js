import React from 'react';

import './ProfileImage.css';

import camera from './assets/camera.svg';
import placeholder from './assets/user-placeholder.svg';

const ProfileImage = ({ imgUrl, icon }) => {
  const style = {
    backgroundImage: `url(${imgUrl ? imgUrl : placeholder})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover'
  };
  return (
    <div className="ProfileImage" style={style}>
      <div className="editIcon">
        <img src={camera} />
        <p className="Medium-Text-Bold">Editar foto</p>
      </div>
    </div>
  );
};

export default ProfileImage;
