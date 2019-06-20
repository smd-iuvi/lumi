import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './CardFilm.css';

import * as ROUTES from '../../constants/routes';

import card from '../../assets/birdbox.jpg';
import iconDelete from './assets/delete.svg';
import iconEdit from './assets/edit.svg';

class CardFilm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showOptions: false
    };
    this.handleOptions = this.handleOptions.bind(this);
  }

  handleOptions = () => {
    this.setState({ showOptions: !this.state.showOptions });
  };
  render() {
    const { video, type } = this.props;
    return (
      <>
        <div className="cardFilm">
          <Link
            to={`${ROUTES.PLAYER}/${video.uid}`}
            style={{ textDecoration: 'none' }}
          >
            <article className="containerImgCard">
              <img
                src={video && video.imageUrl ? video.imageUrl : card}
                className="imgCard"
              />
            </article>
          </Link>

          <div className="infosCard">
            <Link
              to={`${ROUTES.PLAYER}/${video.uid}`}
              style={{ textDecoration: 'none' }}
            >
              <div>
                <h1 className="Medium-Text-Bold">
                  {video ? video.title : 'Nome indefinido'}
                </h1>
                <h1 className="Medium-Text-Regular">
                  {video && video.discipline
                    ? `${video.discipline.substring(0, 20)}...`
                    : 'Vídeo independente'}
                </h1>
              </div>
            </Link>
            <div>
              {type === "myList" || type === "myVideos" &&
                <article className="buttonOptions" onClick={this.handleOptions} />
              }
              {this.state.showOptions && (
                <div className="dropdownOptions">
                  {type === "myList" && (
                    <article>
                      <img src={iconDelete} />
                      <h1 className="Small-Text-Regular">Remover</h1>
                    </article>
                  )}
                  {type === "myVideos" && (
                    <>
                      <article>
                        <img src={iconEdit} />
                        <h1 className="Small-Text-Regular">Editar</h1>
                      </article>
                      <article>
                        <img src={iconDelete} />
                        <h1 className="Small-Text-Regular">Excluir</h1>
                      </article>
                    </>
                  )}
                </div>
              )}

            </div>
          </div>
        </div>
      </>
    );
  }
};

export default CardFilm;
