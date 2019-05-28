import React, { Component } from 'react';
import './TabBar.css';

import Header from '../Header/Header';
import Tabs from './Tabs/Tabs';

class TabBar extends Component {
  render() {
    return (
      <div className="tabBar">
        <div className="titleTabBar">
          <article>
            <img src={this.props.icon} />
          </article>
          <Header>{this.props.title}</Header>
        </div>
        <Tabs tabs={this.props.tabs} onTabChange={this.props.onTabChange} />
      </div>
    );
  }
}

export default TabBar;
