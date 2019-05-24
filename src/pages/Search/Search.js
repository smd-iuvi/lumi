import React, { Component } from 'react';
// import './Search.css';

import iconResultSearch from './assets/resultSearch.svg';

import { withRouter } from 'react-router-dom';

import TabBar from '../../components/TabBar/TabBar';
import CardList from '../../components/CardList/CardList';
import CardFilm from '../../components/CardFilm/CardFilm';

class Search extends Component {

    constructor(props) {
        super(props);

        this.state = {
            tabs: ['Tudo', 'Vídeos', 'Pessoas', 'Disciplinas'],
            selected: 0,
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
                    <CardList>
                        <CardFilm name="Interestelar" discipline="Narrativas Multimidia" />
                        <CardFilm name="Interestelar" discipline="Narrativas Multimidia" />
                        <CardFilm name="Interestelar" discipline="Narrativas Multimidia" />
                        <CardFilm name="Interestelar" discipline="Narrativas Multimidia" />
                    </CardList>
                </>
            );
        } else if (selected == 1) {
            container = (
                <>
                    <CardList>
                        <CardFilm name="Interestelar" discipline="Narrativas Multimidia" />
                        <CardFilm name="Interestelar" discipline="Narrativas Multimidia" />
                        <CardFilm name="Interestelar" discipline="Narrativas Multimidia" />
                        <CardFilm name="Interestelar" discipline="Narrativas Multimidia" />
                    </CardList>
                </>
            );
        } else if (selected == 2) {
            container = (
                <>
                    <CardList>
                        <CardFilm name="Interestelar" discipline="Narrativas Multimidia" />
                        <CardFilm name="Interestelar" discipline="Narrativas Multimidia" />
                        <CardFilm name="Interestelar" discipline="Narrativas Multimidia" />
                        <CardFilm name="Interestelar" discipline="Narrativas Multimidia" />
                    </CardList>
                </>
            );
        } else if (selected == 3) {
            container = (
                <>
                    <CardList>
                        <CardFilm name="Interestelar" discipline="Narrativas Multimidia" />
                        <CardFilm name="Interestelar" discipline="Narrativas Multimidia" />
                        <CardFilm name="Interestelar" discipline="Narrativas Multimidia" />
                        <CardFilm name="Interestelar" discipline="Narrativas Multimidia" />
                    </CardList>
                </>
            );
        }
        return (
            <>
                <TabBar
                    icon={iconResultSearch}
                    title="Resultado da busca"
                    tabs={this.state.tabs}
                    onTabChange={this.onTabChange}
                />
                <div className="container">{container}</div>
            </>
        );
    }
}

export default Search;
