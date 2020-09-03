import React, { useState } from 'react';

import './VideoEvent.css';

import iconDelete from '../assets/delete-event.svg';

function VideoEvent(props) {
    const [showOptions, setShowOptions] = useState(false);

    function handleOptions() {
        setShowOptions(!showOptions);
    }

    function accessEvent() {
        props.goEvent();
    }

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
                <article className="buttonOptions" onClick={handleOptions}></article>
                {showOptions &&
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
export default VideoEvent;
