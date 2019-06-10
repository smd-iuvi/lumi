import React, { Component } from 'react';
import './Event.css';

import TabBar from '../../components/TabBar/TabBar';
import CardList from '../../components/CardList/CardList';

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
                    <div className="bannerEvent">
                        <div>
                            <h1 className="Large-Text-Bold">Além dos portões: documentário na comunidade Planalto Pici</h1>
                            <h1 className="Medium-Text-Regular">Trabalho realizado com moradores da comunidade Planalto Pici a partir da visão dos estudantes da disciplina sobre a dinâmica social presente na comunidade.</h1>
                            <h1 className="Small-Text-Bold">Educomunicação</h1>
                            <h1 className="Small-Text-Regular">Lançado em 04/05/2019</h1>
                        </div>
                        <article></article>
                    </div>
                    <article className="line"></article>
                    <h1 className="Small-Text-Bold titleSectionEvents">TRABALHOS PUBLICADOS NESTE EVENTO</h1>
                    <CardList videos={null} loading={false} belowTab={true} />
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
            <div className="EventPage">
                <TabBar
                    icon={iconEventSearch}
                    title="Evento"
                    tabs={this.state.tabs}
                    onTabChange={this.onTabChange}
                    profileTeacher={false}
                />
                <div className="container">{container}</div>
            </div>
        );
    }
}

export default Event