import React, { Component } from 'react';

import './EventInfos.css';

const EventInfos = () => {
    return (
        <div className="infosEvent">
            <div>
                <h1 className="Small-Text-Bold titleManage">GERENCIAR EVENTO</h1>
                <h1 className="Medium-Text-Bold">Além dos portões: documentário na comunidade Planalto Pici</h1>
                <article className="infosHorizontal">
                    <h1 className="Small-Text-Bold">Educomunicação</h1>
                    <h1 className="Small-Text-Regular">Acontecerá em 04/05/2019</h1>
                </article>
                <h1 className="Medium-Text-Regular">Trabalho realizado com moradores da comunidade Planalto Pici a partir da visão dos estudantes da disciplina sobre a dinâmica social presente na comunidade.</h1>
                <button className="button buttonTerceary">Editar informações</button>
            </div>
            <div>
                <article className="bannerEvent">
                    {/* aqui vai ter a imagem */}
                </article>
            </div>
        </div>
    )
}

export default EventInfos
