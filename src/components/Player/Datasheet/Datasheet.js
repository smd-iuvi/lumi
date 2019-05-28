import React, { Component } from 'react';
import './Datasheet.css';

import Tabs from '../../TabBar/Tabs/Tabs';
import Tags from '../../Tags/Tags';

class Datasheet extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tabs: ["Ficha técnica", "Informações acadêmicas", "Tags"],
            selected: 0
        };
    }

    onTabChange = newTab => {
        this.setState({ selected: newTab });
    };

    render() {
        const { selected } = this.state;
        let container = null;

        if (selected == 0) {
            container = (
                <>
                    <div className="contentFunction">
                        <h1 className="Medium-Text-Regular titleFunction">Direção</h1>
                        <h1 className="Medium-Text-Regular">Fulaninho de Tal</h1>
                    </div>
                    <div className="contentFunction">
                        <h1 className="Medium-Text-Regular titleFunction">Fotografia</h1>
                        <h1 className="Medium-Text-Regular">Fulaninho de Tal, Fulaninho de Tal</h1>
                    </div>
                    <div className="contentFunction">
                        <h1 className="Medium-Text-Regular titleFunction">Edição</h1>
                        <h1 className="Medium-Text-Regular">Fulaninho de Tal</h1>
                    </div>
                    <div className="contentFunction">
                        <h1 className="Medium-Text-Regular titleFunction">Direção de arte</h1>
                        <h1 className="Medium-Text-Regular">Fulaninho de Tal</h1>
                    </div>
                    <div className="contentFunction">
                        <h1 className="Medium-Text-Regular titleFunction">Trilha sonora</h1>
                        <h1 className="Medium-Text-Regular">Fulaninho de Tal</h1>
                    </div>
                    <div className="contentCast">
                        <h1 className="Medium-Text-Regular titleFunction">Elenco</h1>
                        <div>
                            <h1 className="Medium-Text-Regular">Fulaninho de Tal</h1>
                            <h1 className="Medium-Text-Regular">Fulaninho de Tal</h1>
                            <h1 className="Medium-Text-Regular">Fulaninho de Tal</h1>
                            <h1 className="Medium-Text-Regular">Fulaninho de Tal</h1>
                            <h1 className="Medium-Text-Regular">Fulaninho de Tal</h1>
                        </div>
                        <div>
                            <h1 className="Medium-Text-Regular">Fulaninho de Tal</h1>
                            <h1 className="Medium-Text-Regular">Fulaninho de Tal</h1>
                            <h1 className="Medium-Text-Regular">Fulaninho de Tal</h1>
                            <h1 className="Medium-Text-Regular">Fulaninho de Tal</h1>
                        </div>
                    </div>
                </>
            );
        } else if (selected == 1) {
            container = (
                <>
                    <div className="contentFunction">
                        <h1 className="Medium-Text-Regular titleFunction">Disciplina</h1>
                        <h1 className="Medium-Text-Regular">Narrativas Multimídea</h1>
                    </div>
                    <div className="contentFunction">
                        <h1 className="Medium-Text-Regular titleFunction">Semestre</h1>
                        <h1 className="Medium-Text-Regular">2018.1</h1>
                    </div>
                    <div className="contentFunction">
                        <h1 className="Medium-Text-Regular titleFunction">Professor(es)</h1>
                        <h1 className="Medium-Text-Regular">Georgia Cruz, Glaudiney Mendonça</h1>
                    </div>
                    <div className="contentFunction">
                        <h1 className="Medium-Text-Regular titleFunction">Sobre o trabalho</h1>
                        <h1 className="Medium-Text-Regular">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut varius euismod est, nec sollicitudin elit placerat et. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent nec quam efficitur, pretium sem in, vehicula neque. Sed tincidunt lectus a dolor sagittis aliquam.</h1>
                    </div>
                    <div className="contentFunction">
                        <h1 className="Medium-Text-Regular titleFunction">Evento de disciplina</h1>
                        <h1 className="Medium-Text-Regular">Trabalhos finais</h1>
                    </div>
                </>
            );
        } else if (selected == 2) {
            container = (
                <div className="contentFunction">
                    <Tags />
                </div>
            );
        }
        return (
            <div className="datasheet">
                <Tabs tabs={this.state.tabs} onTabChange={this.onTabChange} />
                <div className="contentTab">{container}</div>
            </div>
        );
    }
}

export default Datasheet;