import React, { Component } from 'react';
import TabBar from '../../components/TabBar/TabBar';

import iconEventSearch from './assets/event.svg';

class Event extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tabs: ['Geral', 'Participantes'],
            selected: 0
        };
    }

    onTabChange = newTab => {
        this.setState({ selected: newTab });
    };

    render() {
        const {
            selected
        } = this.state;

        let container = null;

        if (selected == 0) {
            container = (
                <>
                    <h1>aba 1</h1>
                </>
            );
        } else if (selected == 1) {
            container = (
                <>
                    <h1>aba 2</h1>
                </>
            );
        }
        return (
            <>
                <TabBar
                    icon={iconEventSearch}
                    title="Evento"
                    tabs={this.state.tabs}
                    onTabChange={this.onTabChange}
                    profileTeacher={false}
                />
                <div className="container">{container}</div>
            </>
        );
    }
}

export default Event