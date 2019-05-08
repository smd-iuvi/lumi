import React, { Component } from 'react';

import './Event.css';

class Event extends Component {
    render() {
        return (
            <div className="Event">
                <div className="eventDate">
                    <h1 className="Event-Day">18</h1>
                    <h1 className="Event-Month">ABR</h1>
                </div>
                <div>
                    <h1 className="Small-Titles">Curtas animados para crianças com autismo</h1>
                    <h1 className="Small-Subtitles">Produção Audiovisual para Crianças e Adolescentes</h1>
                </div>
            </div>
        );
    }
}

export default Event;
