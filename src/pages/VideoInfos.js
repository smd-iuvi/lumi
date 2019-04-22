import React, { Component } from 'react';
import Navbar from '../components/Navbar';
import './VideoInfos.css';

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
        </div>
      </div>
    );
  }
}

export default VideoInfos;
