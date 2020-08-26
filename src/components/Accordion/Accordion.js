import React, { useState } from 'react';
import './Accordion.css';

function Accordion(props) {
    const [isOpen, setIsOpen] = useState(false);

    function handleIsOpen() {
        setIsOpen(!isOpen);
    }

    var style = { borderRadius: isOpen ? '10px 10px 0 0' : '10px' };

    return <div>
        <article className="accordion" style={style} onClick={handleIsOpen}>
            <div>
                <p className="Medium-Text-Bold">{props.title}</p>
                <p className="Medium-Text-Regular">{props.subtitle}</p>
            </div>
            {!isOpen ?
                <i class="fas fa-caret-down"></i> :
                <i class="fas fa-caret-up"></i>
            }
        </article>
        {isOpen &&
            <div class="body">
                {props.content}
            </div>
        }
    </div>
}

export default Accordion;