import React, { Component } from 'react';
import './Upload.css';

import Header from '../../components/Header/Header';
import SectionTitle from '../../components/SessionTitle/SessionTitle';
import TextAreaInformation from '../../components/Upload/TextAreaInformation/TextAreaInformation';
import TextFieldInformation from '../../components/Upload/TextFieldInformation/TextFieldInformation';
import Thumbnail from '../../components/Upload/Thumbnail/Thumbnail';
import AddTags from '../../components/Upload/AddTags/AddTags';
import SelectBox from '../../components/Upload/SelectBox/SelectBox';
import NewInformation from '../../components/Upload/NewInformation/NewInformation';

class Upload extends Component {
    constructor(props) {
        super(props);
        this.state = {
            options: []
        };
        this.addInformation = this.addInformation.bind(this);
    }

    addInformation = () => {
        //adicionar novo NewInformation
    }

    render() {
        return (
            <div className="container uploadContainer">
                <div className="topContainer">
                    <div>
                        <Header>Enviar vídeo</Header>
                        <TextAreaInformation>Sinopse/Descrição</TextAreaInformation>
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
                <div className="bottomContainer">
                    <div className="leftContainer">
                        <SectionTitle>Ficha Técnica</SectionTitle>
                        <button className="Context-Button addInfo">ADICIONAR INFORMAÇÃO</button>
                        <NewInformation />
                    </div>
                    <div>
                        <SectionTitle>Informações Acadêmicas</SectionTitle>
                        <SelectBox name="Discipline" label="Disciplina" />
                        <TextFieldInformation label="Professor" />
                        <SelectBox name="Semester" label="Semestre" />
                        <TextAreaInformation>Sobre o trabalho</TextAreaInformation>
                    </div>
                </div>
            </div>
        );
    }
}

export default Upload;
