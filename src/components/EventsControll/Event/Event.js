import React, { Component } from 'react';

import './Event.css';

import iconManage from '../assets/manage-event.svg';
import iconDelete from '../assets/delete-event.svg';

class Event extends Component {
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

  accessEvent = () => {
    this.props.goEvent();
  };

  render() {
    const { event, onDelete } = this.props;
    return (
      <>
        <div className="EventInfo">
          <h1 className="Small-Text-Regular">
            {event.name ? event.name : 'Indisponível'}
          </h1>
          <h1 className="Small-Text-Regular">
            {event.discipline ? event.discipline : 'Indisponível'}
          </h1>
          <h1 className="Small-Text-Regular">
            {event.date ? event.date : 'Indisponível'}
          </h1>
          <h1 className="Small-Text-Regular">8</h1>
          <article className="buttonOptions" onClick={this.handleOptions} />
          {this.state.showOptions && (
            <div className="dropdownOptions">
              <article onClick={this.accessEvent}>
                <img src={iconManage} />
                <h1 className="Small-Text-Regular">Gerenciar evento</h1>
              </article>
              <article onClick={onDelete}>
                <img src={iconDelete} />
                <h1 className="Small-Text-Regular">Excluir</h1>
              </article>
            </div>
          )}
        </div>
        <article className="line" />
      </>
    );
  }
}

export default Event;
