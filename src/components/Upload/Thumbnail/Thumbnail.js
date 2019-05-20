import React from 'react'

import './Thumbnail.css';

import image from './assets/imagem.svg';

const Thumbnail = () => {
    return (
        <div className="containerThumb">
            <div>
                <h1 className="titleThumb">Adicione uma capa ao vídeo</h1>
                <h1 className="subtitleThumb">A imagem deve ter no mínimo 368 x 242 pixels (altura x largura) e estar na horizontal.</h1>
            </div>
            <input type="file" className="file" id="file" />
            <label for="file" className="button buttonSecundary inputFile">Escolher arquivo</label>
            <div className="thumb">
                <img src={image} />
            </div>
        </div>
    )
}

export default Thumbnail
