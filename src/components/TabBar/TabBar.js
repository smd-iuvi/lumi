import React, { useState } from 'react';
import './TabBar.css';

import Header from '../Header/Header';
import Tabs from './Tabs/Tabs';
import NewEvent from '../NewEvent/NewEvent';

function TabBar(props) {
  const [showModal, setShowModal] = useState(false);

  function handleModal() {
    setShowModal(true);
  };

  function onChangeState() {
    setShowModal(false);
  };

  let container = null;
  const { selected, profileTeacher } = props;

  if (props.tabs !== null) {
    container = (
      <>
        {profileTeacher ? (
          <div className="tabTeacher">
            <Tabs
              tabs={props.tabs}
              selected={selected}
              onTabChange={props.onTabChange}
            />
          </div>
        ) : (
            <Tabs
              tabs={props.tabs}
              selected={selected}
              onTabChange={props.onTabChange}
            />
          )}
      </>
    );
  }

  return (
    <div className="tabBar">
      <NewEvent
        show={showModal}
        onChangeState={onChangeState}
      />
      <div className="titleTabBar">
        <article>
          <img src={props.icon} />
        </article>
        <Header>{props.title}</Header>
        <button
          className="button buttonPrimary"
          onClick={handleModal}
        >
          Criar evento
        </button>
      </div>
      {container}
    </div>
  );
}

export default TabBar;
