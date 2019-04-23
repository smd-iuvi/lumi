import React, { Component } from 'react';
import Navbar from '../components/Navbar';
import './VideoInfos.css';
import addList from '../assets/icons/add_list.svg';
import share from '../assets/icons/share_button.svg';
import applause from '../assets/icons/clap_button.svg';

class VideoInfos extends Component {
  render() {
    return (
      <div>
        <Navbar/>
        <div className="container">
            <h1 className="Type">Filme</h1>
            <h1 className="Heading TitleFilm">Bird Box</h1>
            <h1 className="Descriptions Discipline">Narrativas Multimídea</h1>
            <div className="Infos">
                <h1 className="Descriptions">2018</h1>
                <h1 className="Descriptions">2h4min</h1>
                <h1 className="Descriptions">Thriller</h1>
            </div>
            <h1 className="Descriptions">Quando uma força misteriosa dizima a população, apenas uma coisa é certa: se você olhar, você morre.</h1>

            <button className="Play" onClick={() => this.props.history.push('/Player')}>
              <i className="fas fa-play"></i>ASSISTIR
            </button>
            <div className="Actions">
              <div>
                <img src={addList} className="Icons"/>
                <h1 className="Actions-Video">Minha {<br/>} lista</h1>
              </div>
              <div>
                <img src={share} className="Icons"/>
                <h1 className="Actions-Video">Compartilhar</h1>
              </div>
              <div>
                <img src={applause} className="Icons"/>
                <h1 className="Actions-Video">5.2k</h1>
              </div>
            </div>
        </div>
      </div>
    );
  }
}

export default VideoInfos;
