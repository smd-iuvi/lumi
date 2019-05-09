import React, { Component } from 'react';
import './Upload.css';

import Header from '../../components/Header/Header';
import Description from '../../components/Upload/Description/Description';
import TextFieldInformation from '../../components/Upload/TextFieldInformation/TextFieldInformation';
import Thumbnail from '../../components/Upload/Thumbnail/Thumbnail';
import AddTags from '../../components/Upload/AddTags/AddTags';
import SelectBox from '../../components/Upload/SelectBox/SelectBox';

class Upload extends Component {
    render() {
        return (
            <div className="container uploadContainer">
                <div>
                    <Header>Enviar vídeo</Header>
                    <Description />
                    <SelectBox name="Gender" label="Gênero" />
                </div>
                <div>
                    <button className="button buttonSecundary">DESFAZER ALTERAÇÕES</button>
                    <button className="button buttonPrimary">SALVAR</button>
                    <TextFieldInformation label="Link para o vídeo" />
                    <TextFieldInformation label="Título" />
                    <Thumbnail />
                </div>
                <div>
                    <AddTags />
                    <SelectBox name="ParentalRating" label="Classificação" />
                    <TextFieldInformation label="Conteúdo" />
                </div>
            </div>
        );
    }
}

export default Upload;
