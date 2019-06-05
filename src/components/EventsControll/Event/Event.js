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
    }

    accessEvent = () => {
        this.props.goEvent();
    }

    render() {
        return (
            <>
                <div className="EventInfo">
                    <h1 className="Small-Text-Regular">Curtas animados para crianças com autismo</h1>
                    <h1 className="Small-Text-Regular">Narrativas multimidia</h1>
                    <h1 className="Small-Text-Regular">22/04/2018</h1>
                    <h1 className="Small-Text-Regular">8</h1>
                    <article className="buttonOptions" onClick={this.handleOptions}></article>
                    {this.state.showOptions &&
                        <div className="dropdownOptions">
                            <article onClick={this.accessEvent}>
                                <img src={iconManage} />
                                <h1 className="Small-Text-Regular">Gerenciar evento</h1>
                            </article>
                            <article>
                                <img src={iconDelete} />
                                <h1 className="Small-Text-Regular">Excluir</h1>
                            </article>
                        </div>
                    }
                </div>
                <article className="line"></article>
            </>
        )
    }
}

export default Event
