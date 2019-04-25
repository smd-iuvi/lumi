import React, { Component } from 'react';
import './styles/Event.css';

class Event extends Component {
    render() {
        return (
            <div className="Event">
                <article className="eventDate"></article>
                <div>
                    <h1 className="Small-Titles">Curtas animados para crianças com autismo</h1>
                    <h1 className="Small-Subtitles">Produção Audiovisual para Crianças e Adolescentes</h1>
                </div>
            </div>
        );
    }
}

export default Event;
