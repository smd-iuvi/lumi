import React, { Component } from 'react';

import './NewInformation.css';

import iconX from './assets/x.svg';

class NewInformation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            tags: [],
            options: ['Direção', 'Edição', 'Trilha Sonora', 'Roteiro', 'Filmagem', 'Fotografia']
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.setState({ value: e.target.value });
    }

    closeInfo = () => {
        this.props.removeFunction(this.props.index)
    }

    render() {
        return (
            <div className="NewInformation">
                <div>
                    <img src={iconX} className="closeInfo" onClick={this.closeInfo} />
                </div>
                <div>
                    <select className="Medium-Text-Regular">
                        {this.state.options.map((op) =>
                            <option value={op}>{op}</option>
                        )}
                    </select>
                    <br />
                    <input type="text"
                        placeholder="Nome do participante"
                        value={this.state.value}
                        onKeyDown={this.keyPress}
                        onChange={this.handleChange}
                        className="Medium-Text-Regular"
                    />
                </div>
            </div >
        )
    }
}

export default NewInformation
