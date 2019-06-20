import React, { Component } from 'react';
import './TabBar.css';

import Header from '../Header/Header';
import Tabs from './Tabs/Tabs';
import NewEvent from '../NewEvent/NewEvent';

class TabBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false
    };
    this.handleModal = this.handleModal.bind(this);
  }
  handleModal = () => {
    this.setState({ showModal: true });
  };

  onChangeState = () => {
    this.setState({ showModal: false });
  };

  render() {
    let container = null;
    const { selected, profileTeacher } = this.props;

    console.log(profileTeacher);

    if (this.props.tabs !== null) {
      container = (
        <>
          {profileTeacher ? (
            <div className="tabTeacher">
              <Tabs
                tabs={this.props.tabs}
                selected={selected}
                onTabChange={this.props.onTabChange}
              />
              <button
                className="button buttonPrimary"
                onClick={this.handleModal}
              >
                Criar evento
              </button>
            </div>
          ) : (
            <Tabs
              tabs={this.props.tabs}
              selected={selected}
              onTabChange={this.props.onTabChange}
            />
          )}
        </>
      );
    }

    return (
      <div className="tabBar">
        <NewEvent
          show={this.state.showModal}
          onChangeState={this.onChangeState}
        />
        <div className="titleTabBar">
          <article>
            <img src={this.props.icon} />
          </article>
          <Header>{this.props.title}</Header>
        </div>
        {container}
      </div>
    );
  }
}

export default TabBar;
