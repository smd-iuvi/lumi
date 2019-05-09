import React, { Component } from 'react';

import './NewInformation.css';

import Tag from '../AddTags/Tag/Tag';

class NewInformation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            tags: [],
            options: ['Direção', 'Edição', 'Trilha Sonora', 'Roteiro', 'Filmagem', 'Fotografia']
        };
        this.handleChange = this.handleChange.bind(this);
        this.keyPress = this.keyPress.bind(this);
    }

    handleChange(e) {
        this.setState({ value: e.target.value });
    }

    keyPress(e) {
        if (e.keyCode == 13) {
            const getTags = this.state.tags;
            getTags.push(e.target.value);
            this.setState({ tags: getTags, value: '' });
        }
    }

    render() {
        return (
            <div className="NewInformation infosContainer">
                <div>
                    X
                </div>
                <div>
                    <select>
                        {this.state.options.map((op) =>
                            <option value={op}>{op}</option>
                        )}
                    </select>
                    <input type="text" placeholder="Nome do participante" value={this.state.value} onKeyDown={this.keyPress} onChange={this.handleChange} />
                    <div className="tags">
                        {this.state.tags.map((tag) =>
                            <Tag>{tag}</Tag>
                        )}
                    </div>
                </div>
            </div>
        )
    }
}

export default NewInformation
