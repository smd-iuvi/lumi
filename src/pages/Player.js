import React, { Component } from 'react';
import Navbar from '../components/Navbar';
import SidebarPlayer from '../components/SidebarPlayer';
import './Player.css';
import addList from '../assets/icons/add_list.svg';
import share from '../assets/icons/share_button.svg';
import applause from '../assets/icons/clap_button.svg';


class Player extends Component {
  render() {
    return (
      <div>
        <Navbar/>
        <div className="container">
          <iframe src="https://www.youtube.com/embed/bo_efYhYU2A" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          {/* <SidebarPlayer/> */}
          <h1 className="Title-Film title">Bird Box</h1>
          <h1 className="Views-Film">5092 visualizações</h1>
          <div className="Actions ActionsPlayer">
            <img src={addList} className="Icons"/>
            <img src={share} className="Icons"/>
            <div>
              <img src={applause} className="Icons"/>
              <h1 className="Actions-Video">5.2k {<br/>} aplausos</h1>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Player;
