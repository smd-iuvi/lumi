import React, { Component } from 'react';
import './NewEvent.css';

import Header from '../Header/Header';

import iconX from './assets/x.svg';

class NewEvent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            step: 1
        };
    }

    closeModal = () => {
        this.setState({ step: 1 });
        this.props.onChangeState();
    };

    render() {
        if (!this.props.show) {
            return null;
        }
        return (
            <div className="NewEvent">
                <div className="backgroundModal" onClick={this.closeModal} />
                <div className="modalUpload">
                    <div className="labelModal">
                        <Header>Criar evento</Header>
                        <img
                            src={iconX}
                            className="closeModal"
                            alt="Botão para fechar modal"
                            onClick={this.closeModal}
                        />
                    </div>

                </div>
            </div>
        );
    }
}

export default NewEvent;
