import React, { useState, useEffect } from 'react';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';

import './SliderCard.css';

import birdbox from '../../assets/birdbox.jpg';
import addList from '../Carousel/assets/add_list.svg';
import removeList from '../Carousel/assets/remove_list.svg';
import * as ROUTES from '../../constants/routes';

import { withServiceManager } from '../../services';
import { withAuthUser } from '../../services/Session';

const onWatch = (uid, history) => {
  history.push(`${ROUTES.PLAYER}/${uid}`);
};

function SliderCard(props) {
  const [isVisibleModalLogin, setIsVisibleModalLogin] = useState(false);
  const [onWatchList, setOnWatchList] = useState(false);

  useEffect(() => {
    const {
      authUser,
      serviceManager
    } = props;
    if (authUser != null && authUser.watchList != null && authUser.watchList.includes(video.uid))
      setOnWatchList(true);
    return () => {
      serviceManager.db.ref(`video/${video.uid}`).off();
    }
  }, []);

  function didAddToWatchlist() {
    const {
      serviceManager,
      authUser
    } = props;
    if (authUser) {
      serviceManager.user
        .addVideoToList(authUser.uid, video.uid)
        .then(() => { setOnWatchList(!onWatchList); })
        .catch(error => { });
    } else {
      handleModal();
    }
  };

  function handleModal() {
    setIsVisibleModalLogin(!isVisibleModalLogin);
  }

  const {
    video,
    history
  } = props;

  return (
    <div className="SliderCard">
      <div className="infos">
        <h1 className="addRecent Small-Text-Bold">ADICIONADO RECENTEMENTE</h1>
        <h1 className="Large-Text-Bold">{video.title}</h1>
        <h1 className="descriptionFilm Medium-Text-Regular">
          {video.description}
        </h1>
        <div className="buttonsFilm">
          <button
            className="button buttonPrimary"
            onClick={() => onWatch(video.uid, history)}
          >
            Assistir
          </button>
          <article className="addList Medium-Text-Bold" onClick={didAddToWatchlist}>
            {!onWatchList ?
              <>
                <img src={addList} />
                Minha Lista
              </> :
              <>
                <img src={removeList} />
                Remover da lista
              </>}
          </article>
        </div>
      </div>
      <article className="containerImg">
        <img src={video && video.imageUrl ? video.imageUrl : birdbox} />
      </article>
    </div>
  );
};

export default compose(
  withRouter,
  withServiceManager,
  withAuthUser
)(SliderCard);