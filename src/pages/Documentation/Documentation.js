import React, { useState } from 'react';
import Sidebar from './Sidebar/Sidebar';

function Documentation(props) {
    const [body, setBody] = useState("ola");

    function changeBody(value) {
        setBody(value);
    }
    return <div>
        <Sidebar changeBody={changeBody} />
        <h1>{body}</h1>
    </div>
}

export default Documentation;