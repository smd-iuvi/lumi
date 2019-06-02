import React, { Component } from 'react';

import './EventsControll.css';

import Event from './Event/Event';
import ManageEvent from './ManageEvent/ManageEvent';

class EventsControll extends Component {
    constructor(props) {
        super(props);

        this.state = {
            manageEvent: false
        };
        this.goEvent = this.goEvent.bind(this);
    }

    goEvent = () => {
        this.setState({ manageEvent: !this.state.manageEvent });
    }

    render() {
        let container = null;
        if (this.state.manageEvent) {
            container = (
                <>
                    <ManageEvent back={this.goEvent} />
                </>
            );
        } else {
            container = (
                <>
                    <div className="EventInfo EventLabels">
                        <h1 className="Small-Text-Regular">Nome</h1>
                        <h1 className="Small-Text-Regular">Disciplina</h1>
                        <h1 className="Small-Text-Regular">Data</h1>
                        <h1 className="Small-Text-Regular">Vídeos cadastrados</h1>
                    </div>
                    <article className="line"></article>
                    <Event goEvent={this.goEvent} />
                    <Event goEvent={this.goEvent} />
                </>
            );
        }
        return (
            <div className="EventsControll">
                {container}
            </div>
        )
    }
}

export default EventsControll
