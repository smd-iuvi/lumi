import React, { Component } from 'react';

import './NewInformation.css';

import iconX from './assets/x.svg';

class NewInformation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      options: [
        'Direção',
        'Edição',
        'Trilha Sonora',
        'Roteiro',
        'Filmagem',
        'Fotografia'
      ]
    };
  }

  render() {
    const { member, onChange, remove } = this.props;
    return (
      <div className="NewInformation">
        <div>
          <img src={iconX} className="closeInfo" onClick={remove} />
        </div>
        <div>
          <select
            name="role"
            value={member.role}
            onChange={onChange}
            className="Medium-Text-Regular"
          >
            {this.state.options.map(op => (
              <option value={op}>{op}</option>
            ))}
          </select>
          <br />
          <input
            type="text"
            placeholder="Nome do participante"
            name="name"
            value={member.name}
            onChange={onChange}
            className="Medium-Text-Regular"
          />
        </div>
      </div>
    );
  }
}

export default NewInformation;
