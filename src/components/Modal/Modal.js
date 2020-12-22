import React, { useState } from 'react';

import './Modal.css';

import iconX from './assets/x.svg';
import Header from '../Header/Header';
import { withServiceManager } from '../../services';
import { withAuthUser } from '../../services/Session';

function Upload(props) {
    const { title, closeModal, width, content, options } = props;
    return (
        <div className="Modal">
            <div className="backgroundModal" onClick={closeModal} />
            <div className="bodyModal" style={{ width: width }}>
                <div className="labelModal">
                    <Header>{title}</Header>
                    <img
                        src={iconX}
                        className="closeModal"
                        alt="Botão para fechar modal"
                        onClick={closeModal}
                    />
                </div>
                <div className="contentModal">
                    {content}
                </div>
                <div className="options">
                    {options}
                </div>
            </div>
        </div>
    );
}

export default withAuthUser(withServiceManager(Upload));