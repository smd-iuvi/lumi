import React, { Component } from 'react';

import './EventsControll.css';

import Event from './Event/Event';

class EventsControll extends Component {
    render() {
        return (
            <div className="EventsControll">
                <div className="EventInfo EventLabels">
                    <h1 className="Small-Text-Regular">Nome</h1>
                    <h1 className="Small-Text-Regular">Disciplina</h1>
                    <h1 className="Small-Text-Regular">Data</h1>
                    <h1 className="Small-Text-Regular">Vídeos cadastrados</h1>
                </div>
                <article className="line"></article>
                <Event />
                <Event />
            </div>
        )
    }
}

export default EventsControll
