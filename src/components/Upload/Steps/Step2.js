import React from 'react';

import './Steps.css';

import AddTags from '../AddTags/AddTags';

const Step2 = (props) => {
    return (
        <div className="Steps">
            <h1 className="titleStep">Ficha técnica</h1>
            <article className="line"></article>
            <h1 className="subtitleStep">Aqui você pode mostrar quem participou da produção do seu vídeo.</h1>
            <h1 className="titleStep2">Elenco</h1>
            <AddTags list={true} placeholder="Aperte ENTER para adicionar uma pessoa. Se não possuir elenco, deixe em branco." />
            <h1 className="titleStep2">Funções dos participantes</h1>
        </div>
    );
};

export default Step2;
