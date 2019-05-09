import React, { Component } from 'react';

import './SelectBox.css';

import Label from '../Label/Label';

class SelectBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            options: []
        };
    }

    componentDidMount() {
        if (this.props.name == 'ParentalRating') {
            const getOptions = ['Livre', '10 anos', '12 anos', '14 anos', '16 anos', '18 anos'];
            this.setState({
                name: this.props.name,
                options: getOptions
            });
        } else if (this.props.name == 'Gender') {
            const getGenders = ['Animação', 'Aventura', 'Comédia', 'Documentário', 'Drama', 'Fantasia', 'Ficção Científica', 'Musical', 'Romance', 'Suspense', 'Terror'];
            this.setState({
                name: this.props.name,
                options: getGenders
            });
        }
    }

    render() {
        return (
            <div className="SelectBox infosContainer">
                <Label>{this.props.label}</Label>
                <select>
                    {this.state.options.map((op) =>
                        <option value={op}>{op}</option>
                    )}
                </select>
            </div>
        )
    }
}

export default SelectBox
