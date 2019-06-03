import React from 'react';

const StepBar = (props) => {
    return (
        <div className="StepBar">
            <h1 className="Small-Text-Regular">Passo {props.step} de 2</h1>
            {props.step == 1 &&
                <div className="lineSteps">
                    <article className="step stepDone"></article>
                    <article className="step stepToDo"></article>
                </div>
            }
            {props.step == 2 &&
                <div className="lineSteps">
                    <article className="step stepDone"></article>
                    <article className="step stepDone"></article>
                </div>
            }
        </div>
    );
};

export default StepBar;
