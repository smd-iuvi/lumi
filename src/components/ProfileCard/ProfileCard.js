import React from 'react';

import './ProfileCard.css';

import ProfileImage from './ProfileImage/ProfileImage';

const ProfileCard = ({ imgUrl, name, role }) => {
  return (
    <div className="ProfileCard">
      <ProfileImage imgUrl={imgUrl} />
      <p className="name">{name}</p>
      <div className="roleContainer">
        <article className="line" />
        <p className="role">Alunx de Sistemas e Mídias Digitais</p>
        <article className="line" />
      </div>
    </div>
  );
};

export default ProfileCard;
