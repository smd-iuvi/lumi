import React, { Component } from 'react';

import EventInfos from '../EventInfos/EventInfos';
import VideoEvent from '../VideoEvent/VideoEvent';

import './ManageEvent.css';

class ManageEvent extends Component {

    backPage = () => {
        this.props.back();
    }

    render() {
        return (
            <div className="ManageEvent">
                <article className="iconBack" onClick={this.backPage}></article>
                <div>
                    <EventInfos />
                    <article className="line"></article>
                    <h1 className="Small-Text-Bold videosEvent">VÍDEOS CADASTRADOS NESTE EVENTO</h1>
                    <div className="EventInfo EventLabels">
                        <h1 className="Small-Text-Regular">Nome</h1>
                        <h1 className="Small-Text-Regular">Aluno proprietário</h1>
                        <h1 className="Small-Text-Regular">Data de envio</h1>
                    </div>
                    <article className="line"></article>
                    <VideoEvent />
                    <VideoEvent />
                    <VideoEvent />
                </div>
            </div>
        )
    }
}

export default ManageEvent
