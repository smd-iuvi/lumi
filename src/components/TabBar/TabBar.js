import React, { Component } from 'react';
import './TabBar.css';

import Header from '../Header/Header';
import Tabs from './Tabs/Tabs';

class TabBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profileTeacher: null
    }
  }

  componentDidMount() {
    this.setState({ profileTeacher: this.props.profileTeacher });
  }

  render() {
    return (
      <div className="tabBar">
        <div className="titleTabBar">
          <article>
            <img src={this.props.icon} />
          </article>
          <Header>{this.props.title}</Header>
        </div>
        {this.state.profileTeacher ? (
          <div className="tabTeacher">
            <Tabs tabs={this.props.tabs} onTabChange={this.props.onTabChange} />
            <button className="button buttonPrimary">Criar evento</button>
          </div>
        ) : (
            <Tabs tabs={this.props.tabs} onTabChange={this.props.onTabChange} />
          )}

      </div>
    );
  }
}

export default TabBar;
