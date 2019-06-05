import React, { Component } from 'react';

import './VideoEvent.css';

import iconDelete from '../assets/delete-event.svg';

class VideoEvent extends Component {
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
                <div className="EventInfo VideoEvent">
                    <div className="nameVideo">
                        <article>
                            {/* aqui é o placeholder do vídeo */}
                        </article>
                        <h1 className="Small-Text-Regular">O Iluminado</h1>
                    </div>
                    <h1 className="Small-Text-Regular">Stanley Kubrick</h1>
                    <h1 className="Small-Text-Regular">01/05/2019</h1>
                    <article className="buttonOptions" onClick={this.handleOptions}></article>
                    {this.state.showOptions &&
                        <div className="dropdownOptions">
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

export default VideoEvent
