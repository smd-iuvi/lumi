import React, { useState } from 'react';
import './Documentation.css';

import Sidebar from './Sidebar/Sidebar';
import Accordion from '../../components/Accordion/Accordion';

function Documentation(props) {
    const [body, setBody] = useState();

    function changeBody(value) {
        setBody(value);
    }
    return <div>
        <Sidebar changeBody={changeBody} />
        <div className="Documentation container">
            {body}
        </div>
    </div>
}

export default Documentation;