import React from 'react';
import './Producers.css';

import Producer from '../../Sidebar/assets/profile.jpg';

const Producers = () => {
    return (
        <div>
            <div className="Producers">
                <div className="producer">
                    <img src={Producer} className="imgProducer" />
                    <h1 className="Producer-Name">Valentina Flores</h1>
                </div>
                <div className="producer">
                    <img src={Producer} className="imgProducer" />
                    <h1 className="Producer-Name">Valentina Flores</h1>
                </div>
                <div className="producer">
                    <img src={Producer} className="imgProducer" />
                    <h1 className="Producer-Name">Valentina Flores</h1>
                </div>
                <div className="producer">
                    <img src={Producer} className="imgProducer" />
                    <h1 className="Producer-Name">Valentina Flores</h1>
                </div>
            </div>
            <button className="more Context-Button">VER TODOS</button>
        </div>
    );
}

export default Producers;
