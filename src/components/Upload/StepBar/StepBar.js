import React from 'react';

import './StepBar.css';

const StepBar = (props) => {
    return (
        <div className="StepBar">
            <h1 className="Small-Text-Regular">Passo {props.step} de 4</h1>
            {props.step == 1 &&
                <div className="lineSteps">
                    <article className="step stepDone"></article>
                    <article className="step stepToDo"></article>
                    <article className="step stepToDo"></article>
                    <article className="step stepToDo"></article>
                </div>
            }
            {props.step == 2 &&
                <div className="lineSteps">
                    <article className="step stepDone"></article>
                    <article className="step stepDone"></article>
                    <article className="step stepToDo"></article>
                    <article className="step stepToDo"></article>
                </div>
            }
            {props.step == 3 &&
                <div className="lineSteps">
                    <article className="step stepDone"></article>
                    <article className="step stepDone"></article>
                    <article className="step stepDone"></article>
                    <article className="step stepToDo"></article>
                </div>
            }
            {props.step == 4 &&
                <div className="lineSteps">
                    <article className="step stepDone"></article>
                    <article className="step stepDone"></article>
                    <article className="step stepDone"></article>
                    <article className="step stepDone"></article>
                </div>
            }
        </div>
    );
};

export default StepBar;
