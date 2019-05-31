import React from 'react';

import './Thumbnail.css';

import image from './assets/imagem.svg';

const Thumbnail = ({ uploading, url, isValid, onFileChange }) => {
  let backgroundStyle = {
    backgroundImage: `url(${url ? url : image})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center'
  };

  let classes = '';
  if (isValid || isValid == null) {
    classes = `thumb valid`;
  } else {
    classes = `thumb invalid`;
  }
  return (
    <div className="containerThumb">
      <div>
        <h1 className="Medium-Text-Regular">Adicione uma capa ao vídeo</h1>
        <h1 className="Small-Text-Regular">
          A imagem deve ter no mínimo 368 x 242 pixels (altura x largura) e
          estar na horizontal.
        </h1>
      </div>
      <input type="file" className="file" id="file" onChange={onFileChange} />
      <label for="file" className="button buttonSecundary inputFile">
        Escolher arquivo
      </label>
      <div className={classes} style={backgroundStyle}>
        {/* <img src={url ? url : image} /> */}
      </div>
    </div>
  );
};

export default Thumbnail;
