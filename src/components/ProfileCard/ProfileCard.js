import React from 'react';

import './ProfileCard.css';

import ProfileImage from './ProfileImage/ProfileImage';

const ProfileCard = ({ imgUrl, name, role, profileTeacher }) => {
  return (
    <div className="ProfileCard">
      <ProfileImage imgUrl={imgUrl} />
      <p className="Large-Text-Bold name">{name}</p>
      <div className="roleContainer">
        <article className="line" />
        {profileTeacher ? (
          <p className="Small-Text-Regular">Professxr de Sistemas e Mídias Digitais</p>
        ) : (
            <p className="Small-Text-Regular">Alunx de Sistemas e Mídias Digitais</p>
          )}

        <article className="line" />
      </div>
    </div>
  );
};

export default ProfileCard;
