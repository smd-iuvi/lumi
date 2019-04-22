import React, { Component } from 'react';
import Navbar from '../components/Navbar';
import './Player.css';

class Player extends Component {
  render() {
    return (
      <div>
        <Navbar/>
        <iframe width="100%" src="https://www.youtube.com/embed/bo_efYhYU2A" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        <div className="container">
            
        </div>
      </div>
    );
  }
}

export default Player;
