import React from 'react';
import './HomeFilms.css';

import CardFilm from '../CardFilm/CardFilm';
import Header from '../Header/Header';

const HomeFilms = () => {
    return (
        <div className="HomeFilms">
            <div className="titleHomeFilms">
                <Header>Os mais assistidos</Header>
                <button className="button buttonSeeMore">Ver todos</button>
            </div>
            <article className="line" />
            <div className="listFilms">
                <CardFilm name="Interestelar" discipline="Narrativas Multimidia" />
                <CardFilm name="Interestelar" discipline="Narrativas Multimidia" />
                <CardFilm name="Interestelar" discipline="Narrativas Multimidia" />
                <CardFilm name="Interestelar" discipline="Narrativas Multimidia" />
            </div>

        </div>
    );
};

export default HomeFilms;
