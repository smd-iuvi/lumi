import React, { Component } from 'react';

import './Steps.css';

import AddTags from '../AddTags/AddTags';
import NewInformation from '../NewInformation/NewInformation';

import iconNew from './assets/add-function.svg';

class Step2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            functions: [{ func: '', name: '' }]
        }
        this.addFunction = this.addFunction.bind(this);
    }

    addFunction = () => {
        let aux = this.state.functions
        aux.push({ func: '', name: '' })
        this.setState({ functions: aux })
    }

    removeFunction = (value) => {
        let aux = this.state.functions
        aux.splice(value, 1)
        this.setState({ functions: aux })
    }

    render() {
        return (
            <div className="Steps">
                <h1 className="Large-Text-Medium">Ficha técnica</h1>
                <article className="line"></article>
                <h1 className="subtitleStep Small-Text-Regular">Aqui você pode mostrar quem participou da produção do seu vídeo.</h1>
                <h1 className="Medium-Text-Medium">Elenco</h1>
                <AddTags list={true} placeholder="Aperte ENTER para adicionar uma pessoa. Se não possuir elenco, deixe em branco." />
                <h1 className="Medium-Text-Medium">Funções dos participantes</h1>
                <button className="bntNewInformation Small-Text-Bold" onClick={this.addFunction}>
                    <img src={iconNew} />
                    Adicionar função
                </button>
                <div className="functions">
                    {this.state.functions.map((op, index) =>
                        <NewInformation index={index} removeFunction={this.removeFunction} />
                    )}
                </div>
            </div>
        );
    }
};

export default Step2;
