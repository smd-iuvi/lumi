import React, { Component } from 'react';
import Calendar from 'react-calendar';

import './Steps.css';

class Step2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date()
        }
    }

    onChange = date => {
        this.setState({ date });
        console.log(this.state.date);
    }

    render() {
        return (
            <div className="Steps">
                <h1 className="Large-Text-Medium">Data do evento</h1>
                <article className="line" />
                <h1 className="subtitleStep Small-Text-Regular">
                    Quando os vídeos desse evento estarão disponíveis para serem assistidos?
                </h1>
                <div className="calendar">
                    <Calendar
                        onChange={this.onChange}
                        value={this.state.date}
                    />
                </div>
            </div>
        );
    }
}

export default Step2;
