import React, { Component } from 'react';

import EventInfos from '../EventInfos/EventInfos'

import './ManageEvent.css';
import iconBack from '../assets/back.svg';

class ManageEvent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            manageEvent: false
        };
    }

    render() {
        return (
            <div className="ManageEvent">
                <img src={iconBack} className="iconBack" />
                <div>
                    <EventInfos />
                    <article className="line"></article>
                </div>
            </div>
        )
    }
}

export default ManageEvent
