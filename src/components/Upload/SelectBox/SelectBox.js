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
        let getValue = [];
        if (this.props.name == 'ParentalRating') {
            getValue = ['Livre', '10 anos', '12 anos', '14 anos', '16 anos', '18 anos'];
            this.setState({
                name: this.props.name,
                options: getValue
            });
        } else if (this.props.name == 'Gender') {
            getValue = ['Animação', 'Aventura', 'Comédia', 'Documentário', 'Drama', 'Fantasia', 'Ficção Científica', 'Musical', 'Romance', 'Suspense', 'Terror'];
            this.setState({
                name: this.props.name,
                options: getValue
            });
        } else if (this.props.name == 'Discipline') {
            getValue = ['Nenhuma', 'Narrativas Multimídea', 'Produção audiovisual para jovens', 'Outra'];
            this.setState({
                name: this.props.name,
                options: getValue
            });
        } else if (this.props.name == 'Semester') {
            getValue = ['2010.1', '2010.2', '2011.1', '2011.2', '2012.1', '2012.2', '2013.1', '2013.2', '2014.1', '2014.2', '2015.1', '2015.2', '2016.1', '2016.2', '2017.1', '2017.2', '2018.1', '2018.2', '2019.1'];
            this.setState({
                name: this.props.name,
                options: getValue
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
